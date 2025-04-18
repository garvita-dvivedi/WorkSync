from flask import Blueprint, request, jsonify
from models.user import User
from models import db
from utils.auth import generate_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    return jsonify({ 'token': generate_token(user.id) })

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User exists'}), 400
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({ 'token': generate_token(new_user.id) })
