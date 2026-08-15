from rest_framework.permissions import BasePermission


class IsStaffUser(BasePermission):

    message = "Authentication required."

    def has_permission(self, request, view):

        return (
            request.user
            and request.user.is_authenticated
        )