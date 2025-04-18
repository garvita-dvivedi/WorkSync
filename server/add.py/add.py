from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import jwt
from functools import wraps
import os

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_jwt_secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///worksync.db'
db = SQLAlchemy(app)
