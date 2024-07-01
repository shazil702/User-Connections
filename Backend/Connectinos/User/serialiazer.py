from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    friends_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        extra_fields = ['friends_name']
    
    def get_friends_name(self,obj):
        return [friend.username for friend in obj.friends.all()]
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['friends_name'] = self.get_friends_name(instance)
        return representation
    
class UserToken(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
    
class AddUser(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'friends']
    
    def create(self, validated):
        friends_data = validated.pop('friends',[])
        user = User.objects.create(
            username = validated['username'],
            email = validated['email'],
        )
        user.set_password(validated['password'])
        user.save()
        for friend in friends_data:
            user.friends.add(friend)
        return user