from django import forms
from blog.models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content']
        widgets = {
                'content': forms.TextInput(
                    attrs={'id': 'id_content', 'required': True, 'placeholder': 'Say something...'}
                    ),
                }
