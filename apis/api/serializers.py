from rest_framework import serializers
from .models import Usuario
from django.core.validators import RegexValidator,MinLengthValidator, MaxLengthValidator

sin_espacios = RegexValidator(
    regex=r'^[^\s]*$',
    message='No se permiten espacios en blanco en este campo.')


def validar_dominio(correo):
    dominios = ['duocuc.cl', 'profesor.duoc.cl']
    dominio = correo.split('@')[1]
    if dominio not in dominios:
        raise serializers.ValidationError('Solo se permiten los dominios @duocuc.cl y @profesor.duoc.cl.')
    return correo


class UsuarioSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[
        validar_dominio,
        MinLengthValidator(limit_value=5, message="El correo electrónico debe tener al menos 5 caracteres."),
        MaxLengthValidator(limit_value=50, message="El correo electrónico no debe exceder los 100 caracteres."),
        sin_espacios
        ])
    contraseña = serializers.CharField(validators=[
        MinLengthValidator(limit_value=5, message="El correo electrónico debe tener al menos 5 caracteres."),
        MaxLengthValidator(limit_value=20, message="El correo electrónico no debe exceder los 100 caracteres."),
        sin_espacios
        ])
    nombre = serializers.CharField(validators=[
        MinLengthValidator(limit_value=5, message="El correo electrónico debe tener al menos 5 caracteres."),
        MaxLengthValidator(limit_value=100, message="El correo electrónico no debe exceder los 100 caracteres.")
        ])

    class Meta:
        model = Usuario
        fields = ('id', 'email', 'contraseña', 'nombre', 'role')
