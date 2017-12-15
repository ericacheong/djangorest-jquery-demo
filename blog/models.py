from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['create_date']

