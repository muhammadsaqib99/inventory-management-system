from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    class Meta:
        model = Transaction
        fields = [
            "id",
            "product",
            "product_name",
            "transaction_type",
            "quantity",
            "created_at",
        ]