import os
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager


from .models import db, User, Skill, Post, PostLike, Comment, Messaging
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.post_routes import post_routes
from .api.search_routes import search_routes
from .api.follower_routes import follower_routes


# from .api.skill_routes import skill_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://hangin-hangin-heroku.com", "http://hangin-hangin-heroku.com"]
else:
    origins = "*"

socketio = SocketIO(app, cors_allowed_orgins=origins)
#localhost:5000/api/private
#room is roomId "username comnination here"
@socketio.on("join_room", namespace = "/private")
def join(room):
    join_room(room["room"])
    return None

@socketio.on("leave_room", namespace = "/private")
def leave(room):
    leave_room(room["room"])
    return None

@socketio.on("private_message", namespace = "/private")
def private(data):
    #making an instance of Messaging
    #this way or can do request.json("sender_id")
    private_message = Messaging(
        sender_id = data["sender_id"],
        receiver_id = data["receiver_id"],
        message = data["message"],
        created_at = data["created_at"]
    )
    db.session.add(private_message)
    db.session.commit()
    emit("private_message", data, to = data["room"], namespace = "/private",)
    #the to= dataroom and namespace to make sure we are sending it to the right room





# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(follower_routes, url_prefix='/api/followers')
# app.register_blueprint(skill_routes, url_prefix='/api/skills')
app.register_blueprint(search_routes, url_prefix='/api/search')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app, supports_credentials=True)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

if __name__ == '__main__':
    socketio.run(app)
