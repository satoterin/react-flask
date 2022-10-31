from datetime import datetime
import email
from flask import abort, jsonify
from app.models import User
from flask_restful import Resource
from flask_restful.reqparse import RequestParser
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required, current_user

class RegisterApi(Resource):
  parser = RequestParser()
  parser.add_argument('name', required=True, location='json')
  parser.add_argument('email', required=True, location='json')
  parser.add_argument('password', required=True, location='json')
  
  def post(self):
    args = self.parser.parse_args()
    user = User(**args)
    try:
      user.save()
    except IntegrityError:
      abort(400, "email taken")
    id = user.id
    return {'id': str(id)}, 200

class LoginApi(Resource):
  parser = RequestParser()
  parser.add_argument('email', required=True, location='json')
  parser.add_argument('password', required=True, location='json')

  def post(self):
    args = self.parser.parse_args()
    user = User.query.filter_by(email=args['email']).one_or_none()
    if user is None:
      abort(400, 'Invalid email or password')
    if user.check_password(args['password']):
      user.last_logged_in = datetime.now()
      user.save()
      return create_access_token(identity=user)
    abort(400, 'Invalid email or password')

class LogoutApi(Resource):
  decorators = [jwt_required()]
  def get(self):
    current_user.last_logged_in = None
    current_user.save()
    return True

class AuthedUserApi(Resource):
  decorators = [jwt_required()]
  def get(self):
    if current_user is not None:
      return current_user.serialize()
    abort(401, 'Invaild Token')

