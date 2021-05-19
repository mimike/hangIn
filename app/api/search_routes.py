# from flask import Blueprint
# from flask_login import login_required, current_user
# from app.models import User

# search_routes = Blueprint("search", __name__)

# @search_routes.route('/', methods=['POST'])
# @login_required
# def search_user():
#     data = request.json["search"]
# @search_routes.route('/', methods=['POST'])
# @login_required
# def search_user():
#     data = request.json["search"]

#     users = User.query.filter((User.first_name.ilike(f'%{data}%')) | (User.last_name.ilike(f'%{data}'))).all()
#     #skills = Skill.query     .join

#     return {"users": [user.to_dict() for user in users]}

#     # firstResults = User.query.filter(User.first_name.ilike(f'%{data}%')).all()
#     # lastResults = User.query.filter(User.last_name.ilike(f'%{data}%')).all()
#     # users = {
#     #     "firstResults": {},
#     #     "lastResults": {}
#     # }
