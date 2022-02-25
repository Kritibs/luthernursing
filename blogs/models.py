import os
from django.db import models
from django.contrib.auth.models import User
from accounts.models import MyUser
import datetime

class Blog(models.Model):
    blog_title=models.CharField(max_length=200, unique= True)
    blog_content = models.TextField()
    pub_date= models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-pub_date']
    def __str__(self):
        return f"{self.blog_title} -{self.pub_date} "


    
