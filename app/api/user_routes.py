from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user, current_user
from app.models import db, User, follows, Post, Comment, Skill, PostLike

user_routes = Blueprint('users', __name__)

# GET all users
@user_routes.route('/')
# @login_required
def users():
    print("!!!backend!!")
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# Get single user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()




#return jsonify([comment.to_dict() for comment in User.comments])
