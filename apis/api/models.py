from django.db import models

from django.db import models
from django.contrib.auth.hashers import make_password
from django.core.validators import MinLengthValidator



class Usuario(models.Model):
    email = models.EmailField(max_length=50,unique=True,validators=[
        MinLengthValidator(5),

    ])
    contraseña = models.CharField(max_length=20,validators=[
        MinLengthValidator(5),
    ])  
    nombre = models.CharField(max_length=100,validators=[
        MinLengthValidator(5),
    ])  
    ROLE_CHOICES = (
        ('alumno', 'Alumno'),
        ('profesor', 'Profesor'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def save(self, *args, **kwargs):
        self.contraseña = make_password(self.contraseña) #cifra la contraseña
        super(Usuario, self).save(*args, **kwargs)
