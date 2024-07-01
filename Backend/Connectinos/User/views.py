from .models import *
from .serialiazer import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

class UserTokenView(TokenObtainPairView):
    serializer_class = UserToken
    def post(self, request, *args, **kwargs):
        data = request.data     
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            data = response.data
            if 'access' in data:
                return response
            else:
                message = "Invalid credentials. Please check you email and password"
                return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST) 
        return response
    def get_serializer_context(self):
        return super().get_serializer_context()
    
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manageUser(request,id=None):
    users = User.objects.exclude(id=request.user.id)
    if request.method == 'POST':
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response({'email':"Email already exists "}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AddUser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        if id is not None:
          user = get_object_or_404(User,id=id)
          serializer = UserSerializer(user)
          return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        user = get_object_or_404(User,id=id)
        if id is None:
             return Response("Id is Required for editing ", status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(user, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        if id is None:
            return Response("Id is required ", status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(User,id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
