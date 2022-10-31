from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_restful import Api

from config import Config


app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import models, routes

@jwt.user_identity_loader
def user_identity_lookup(user):
  return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
  identity = jwt_data["sub"]
  user = models.User.query.filter_by(id=identity).one_or_none()
  if user.last_logged_in is None:
    return None
  user.last_logged_in = datetime.now()
  user.save()
  return user

