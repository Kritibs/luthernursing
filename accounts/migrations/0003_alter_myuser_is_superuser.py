# Generated by Django 3.2.9 on 2022-02-13 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_myuser_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]