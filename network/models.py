from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey("User", on_delete= models.CASCADE, related_name="user")
    time = models.DateTimeField(auto_now_add=True)
    post = models.CharField(max_length=255)
    
    
    def serialize(self):
        return{
            "id": self.id,
            "post":self.post,
            "date":self.time,
            "user":self.user.username
        }

# class 