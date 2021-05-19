from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    # joins table. referenced/lived  on the User class
    "follows", db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),  #postbird column
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"))
)
class User(db.Model, UserMixin):

  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(), nullable = False)
  last_name = db.Column(db.String(), nullable = False)
  headline = db.Column(db.String())
  city = db.Column(db.String(), nullable = False)
  state = db.Column(db.String(), nullable = False)
  about = db.Column(db.Text)
  main_skills = db.Column(db.String())
  experience = db.Column(db.Text)
  avatar_url = db.Column(db.Text)
  cover_url = db.Column(db.Text)
  email = db.Column(db.String(), nullable = False, unique = True)
  hashed_password = db.Column(db.String(), nullable = False)

 # Associations to access other table properties:
  followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id), #follower's id
        secondaryjoin=(follows.c.user_id == id),     #user_id's id. which is current user
        backref=db.backref("follows", lazy="dynamic"),  # joins table line 5
        lazy="dynamic"
    )
  skills = db.relationship(
      "Skill", backref="user", cascade="all, delete"     #Skill.user.email
  )

  posts = db.relationship(
      "Post", backref="user", cascade="all, delete"
  )

  user_post_likes = db.relationship(
    "PostLike", backref="user", cascade="all, delete"
  )
  #User.user_post_likes gives an array of all the user's likes

  comments = db.relationship(
    "Comment", back_populates="user", cascade="all, delete"
    #comment.py line 14 relationship back_populates="comments"
  )

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "headline": self.headline,
      "city": self.city,
      "state": self.state,
      "about": self.about,
      "skills": self.main_skills,
      "experience": self.experience,
      "avatar_url": self.avatar_url,
      "cover_url": self.cover_url,
      "email": self.email,
      "likes": {like.post_id: like.post_id for like in self.user_post_likes},
      "following": {f"user_id-{user.id}": user.id for user in self.followers},
      "followers": {f"follower_id-{follower.id}": follower.id for follower in self.follows}

      # object containing all the likes via the post id.
      # [{PostLike: {userid: 3, post_id: 3}}, {PostLike: {userid: 4, post_id: 5}}]

      # "comments": [comment.to_dict() for comment in comments]
    }
  def to_user_name_to_dict(self):
    return {
      "user": self.first_name + " " + self.last_name
    }

  def get_follower_info(self):
    return {
      "id": self.id,
      "name": self.first_name + " " + self.last_name,
      "avatar": self.avatar_url
    }
