from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Product(models.Model):
    product_image=models.ImageField(upload_to="images")
    product_name=models.CharField(max_length=200)
    product_price=models.DecimalField(max_digits=5, decimal_places=2)
    pub_date=models.DateTimeField('date published', default= timezone.now)
    product_author= models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product_name} costs {self.product_price}-{self.pub_date} by {self.product_author}"



