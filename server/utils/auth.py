import jwt, datetime
from flask import request, jsonify
from functools import wraps
import os

SECRET_KEY = os.environ.get("SECRET_KEY", "dev")

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except:
        return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token or not token.startswith('Bearer '):
            return jsonify({'message': 'Token is missing!'}), 401

        token = token.split(' ')[1]
        data = decode_token(token)
        if not data:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(data['user_id'], *args, **kwargs)
    return decorated
