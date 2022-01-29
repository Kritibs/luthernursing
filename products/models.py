import os
from django.db import models
from django.contrib.auth.models import User
from accounts.models import MyUser
import datetime
from django.db.models.signals import post_delete
from django.db.models.signals import pre_save
from django.dispatch import receiver

class Product(models.Model):
    product_image=models.ImageField(upload_to="images")
    product_name=models.CharField(max_length=200)
    product_price=models.DecimalField(max_digits=5, decimal_places=2)
    pub_date=models.DateField('date published', default= datetime.date.today)
    product_author= models.ForeignKey(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product_name} costs {self.product_price}-{self.pub_date} by {self.product_author}"


@receiver(post_delete, sender=Product)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.product_image.delete(save=False)
    except:
        pass
    
@receiver(pre_save, sender=Product)
def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
    try:
        old_img = instance.__class__.objects.get(id=instance.id).product_image.path
        try:
            new_img = instance.image.path
        except:
            new_img = None
        if new_img != old_img:
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass
