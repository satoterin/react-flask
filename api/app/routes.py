from app import api
from app import views 

api.add_resource(views.RegisterApi, '/api/auth/register')
api.add_resource(views.LoginApi, '/api/auth/login')
api.add_resource(views.LogoutApi, '/api/auth/logout')
api.add_resource(views.AuthedUserApi, '/api/auth/user')


