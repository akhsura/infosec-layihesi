from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from .models import User
from . import db
import jwt
import datetime
from functools import wraps

api_auth = Blueprint('api_auth', __name__)

# JWT Secret Key (should be in config, but for simplicity)
JWT_SECRET = 'your_jwt_secret_key_here'  # Change this to a secure key

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1]  # Bearer <token>
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@api_auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password required'}), 400

    user = User.query.filter_by(email=data['email'].lower()).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, JWT_SECRET, algorithm="HS256")

    return jsonify({'token': token, 'user': {'id': user.id, 'email': user.email, 'name': user.firstName}})

@api_auth.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': f'Hello {current_user.firstName}! This is a protected endpoint.'})

@api_auth.route('/user', methods=['GET'])
@token_required
def get_user(current_user):
    return jsonify({
        'id': current_user.id,
        'email': current_user.email,
        'name': current_user.firstName
    })
