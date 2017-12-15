from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view()),

    path('api/v1/articles/', views.ArticleList.as_view()),
    path('api/v1/articles/<int:pk>', views.ArticleItem.as_view()),
]
