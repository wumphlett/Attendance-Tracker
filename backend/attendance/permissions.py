from rest_framework import permissions


class PresentersViewAndEditOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.user.is_authenticated and request.user.is_presenter:
            return True

        return False


class SessionPresentersCreateAndRespondersViewOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.user.is_authenticated:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_presenter:
            return True

        if view.action in ("join", "respond"):
            return True

        return False
