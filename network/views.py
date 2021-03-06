import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.models.expressions import F
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt


from .models import Post, User


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")



def posts(request):
    posts = Post.objects.all()
    posts = posts.order_by("-time").all()
    return JsonResponse([post.serialize() for post in posts],safe=False)

@csrf_exempt  # PUTANG INA IKAW LANG PALA KULANG
def composeposts(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    data = json.loads(request.body)
    posts = data.get("post","") # if etoo
    newpost = Post(post = posts , user = request.user)
    newpost.save()
    return JsonResponse({"message": "Email sent successfully."}, status=201)
    
def profile(request,username):
    user  = User.objects.get(username = username)
    posts =Post.objects.filter(user = user)
    
    posts = posts.order_by("-time").all()
    return JsonResponse([post.serialize() for post in posts],safe=False)