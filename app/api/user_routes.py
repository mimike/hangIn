from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user, current_user
from app.models import db, User, Post, Comment, Skill, PostLike

user_routes = Blueprint('users', __name__)

# GET all users
@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

    # return jsonify([user.to_dict() for user in users])  # for every value in users, we turn it into a dic, so now it's in a list/array instead of obj/dict

# Get single user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

#return jsonify([comment.to_dict() for comment in User.comments])

@user_routes.route('/search', methods=['POST'])
@login_required
def search_user():
    data = request.json["search"]

    users = User.query.filter((User.first_name.ilike(f'%{data}%')) | (User.last_name.ilike(f'%{data}'))).all()
    #skills = Skill.query     .join

    return {"users": [user.to_dict() for user in users]}
