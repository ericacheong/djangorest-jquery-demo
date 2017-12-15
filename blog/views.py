from django.shortcuts import render
#from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from rest_framework import generics
from .serializers import ArticleSerializer
from .models import Article
from .forms import ArticleForm

class HomeView(FormView):
    template_name = 'blog/index.html'
    form_class = ArticleForm
    success_url = '/'


class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
