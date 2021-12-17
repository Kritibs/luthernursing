from django.db import models
from django.contrib.auth.models import User
from accounts.models import MyUser
import datetime

class Product(models.Model):
    product_image=models.ImageField(upload_to="images")
    product_name=models.CharField(max_length=200)
    product_price=models.DecimalField(max_digits=5, decimal_places=2)
    pub_date=models.DateField('date published', default= datetime.date.today)
    product_author= models.ForeignKey(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product_name} costs {self.product_price}-{self.pub_date} by {self.product_author}"



