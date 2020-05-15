# Generated by Django 3.0.6 on 2020-05-13 19:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20200509_1526'),
        ('interface', '0009_auto_20200513_0003'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='user',
        ),
        migrations.AddField(
            model_name='job',
            name='coder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.Coder'),
        ),
    ]