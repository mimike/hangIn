from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, User
import json

follower_routes = Blueprint('follower', __name__)

#get all followers for user id don't need
# @follower_routes.route('/follower/<int:user_id>')
# def get_followers(id):
#     @login_required
#     id = User.query.get(id)
#     followers = user.followers
#     for follower in followers:
#     return {"user": user.to_dict()}

#post follow
@follower_routes.route('/follows/<int:id>', methods=['POST'])
@login_required
def followUser(id):
    print("ID!", id)
    user = User.query.filter_by(id = id).first()  #friend's id
    current_user.follows.append(user)
    db.session.add(current_user)
    db.session.commit()
    # return {"user": user.to_user_name_to_dic() }  # {"user": {"user": Jerry Wright}}
    return user.get_follower_info()   #{{id: 4"name": Jerry Wr, avatar: asdf.url}}

#GET follow ALLLLLLLL of the people im following (and followers) works
@follower_routes.route('/follows/<int:id>', methods=['GET'])
@login_required
def getAllFollowingFollower(id):
    #user_id == current user id
    # how do u query FOLLOWS?? its a joins table!!!
    profileUser = User.query.filter_by(id = id).first()
    #users = User.follows.query.filter_by(user_id == current_user.id).all()  #friend's id
    following = {
        user.id: user.get_follower_info() for user in profileUser.follows
    }
    followers = {
        follower.id: follower.get_follower_info() for follower in profileUser.followers
    }
    print("!!follow!", {"following": following, "followers": followers})

    return {"following": following, "followers": followers}

# GETwe want to see who the users following GET ALL of my followers fklter follower_id ==
# @follower_routes.route('/')
# @login_required
# def getAllFollowers(id):
#     users = User.follows.query.filter_by(follower_id == current_user.id).all()  #friend's id

#     return users.get_follower_info()






#post unfollow
@follower_routes.route('/unfollows/<int:user_id>', methods=['POST'])
@login_required
def unfollowUser(id):
    print("ID!", id)
    user = User.query.filter_by(id = id).first()  #friend's id
    current_user.follows.remove(user)
    db.session.add(current_user)
    db.commit()
    return {"user": user.to_user_name_to_dic() }
