from django.shortcuts import render, redirect
from .forms import pic_Form
from .models import Picture


def mainPage(request):
    return render(request, 'first/home.html')


def pic_upload(request):
    if request.method == 'POST':
        form = pic_Form(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('upload_app:Pic_upload')
    else:
        form = pic_Form()
    pictures = Picture.objects.all()
    return render(request, 'first/pic_upload.html', {'form': form})

def pic_show(request):
    pictures = Picture.objects.all()
    return render(request, 'first/pic_show.html', {'pictures': pictures})
