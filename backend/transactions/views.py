from django.db import transaction
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .models import Transaction
from .serializers import TransactionSerializer
from accounts.permissions import IsStaffUser


class TransactionViewSet(viewsets.ModelViewSet):

    queryset = Transaction.objects.select_related("product").all()
    serializer_class = TransactionSerializer
    permission_classes = [IsStaffUser]

    # =========================
    # CREATE
    # =========================

    @transaction.atomic
    def perform_create(self, serializer):

        transaction_obj = serializer.save()

        product = transaction_obj.product

        if transaction_obj.transaction_type == "IN":

            product.quantity += transaction_obj.quantity

        elif transaction_obj.transaction_type == "OUT":

            if transaction_obj.quantity > product.quantity:

                raise ValidationError({
                    "quantity": "Not enough stock."
                })

            product.quantity -= transaction_obj.quantity

        product.save(
            update_fields=["quantity"]
        )

    # =========================
    # UPDATE
    # =========================

    @transaction.atomic
    def update(self, request, *args, **kwargs):

        # Get the transaction directly from the database
        # BEFORE serializer.save() can change anything.

        instance = (
            Transaction.objects
            .select_for_update()
            .select_related("product")
            .get(pk=kwargs["pk"])
        )

        # Save the OLD transaction state.

        old_product_id = instance.product_id
        old_type = instance.transaction_type
        old_quantity = instance.quantity

        # Lock the old product.

        old_product = (
            instance.product.__class__
            .objects
            .select_for_update()
            .get(pk=old_product_id)
        )

        # Create serializer using the database instance.

        serializer = self.get_serializer(
            instance,
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        # =========================
        # REVERSE OLD TRANSACTION
        # =========================

        if old_type == "IN":

            old_product.quantity -= old_quantity

        elif old_type == "OUT":

            old_product.quantity += old_quantity

        old_product.save(
            update_fields=["quantity"]
        )

        # =========================
        # SAVE NEW TRANSACTION
        # =========================

        new_transaction = serializer.save()

        new_product = (
            new_transaction.product
        )

        # If the product changed, lock the new product too.

        new_product = (
            new_product.__class__
            .objects
            .select_for_update()
            .get(pk=new_transaction.product_id)
        )

        new_type = (
            new_transaction.transaction_type
        )

        new_quantity = (
            new_transaction.quantity
        )

        # =========================
        # APPLY NEW TRANSACTION
        # =========================

        if new_type == "IN":

            new_product.quantity += new_quantity

        elif new_type == "OUT":

            if new_quantity > new_product.quantity:

                raise ValidationError({
                    "quantity": "Not enough stock."
                })

            new_product.quantity -= new_quantity

        new_product.save(
            update_fields=["quantity"]
        )

        # Return the updated transaction.

        return Response(
            self.get_serializer(
                new_transaction
            ).data
        )

    # =========================
    # DELETE
    # =========================

    @transaction.atomic
    def perform_destroy(self, instance):

        # Get the latest transaction from DB.

        transaction_obj = (
            Transaction.objects
            .select_for_update()
            .select_related("product")
            .get(pk=instance.pk)
        )

        product = (
            transaction_obj.product
        )

        if transaction_obj.transaction_type == "IN":

            product.quantity -= (
                transaction_obj.quantity
            )

        elif transaction_obj.transaction_type == "OUT":

            product.quantity += (
                transaction_obj.quantity
            )

        product.save(
            update_fields=["quantity"]
        )

        transaction_obj.delete()