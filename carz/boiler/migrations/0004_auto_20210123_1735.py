# Generated by Django 3.1.4 on 2021-01-23 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boiler', '0003_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='maximum',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='data',
            name='minimum',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
