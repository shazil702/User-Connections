from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.UserTokenView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("manage-user/",views.manageUser),
    path("manage-user/<int:id>/",views.manageUser),
]