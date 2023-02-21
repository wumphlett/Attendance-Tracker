from django import forms
from .models import Picture

class pic_Form(forms.ModelForm):
    class Meta:
        model = Picture
        fields = ['picture']      