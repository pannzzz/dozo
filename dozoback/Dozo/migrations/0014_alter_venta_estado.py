# Generated by Django 5.1.3 on 2024-11-17 22:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dozo', '0013_alter_estado_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='estado',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Dozo.estado'),
        ),
    ]