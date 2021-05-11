from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follows = db.Table(
    # joins table
    "followers", db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
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
  avatar_url = db.Column(db.Text)
  cover_url = db.Column(db.Text)
  email = db.Column(db.String(), nullable = False, unique = True)
  hashed_password = db.Column(db.String(), nullable = False)

 # Associations to access other table properties:
  followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("follows", lazy="dynamic"),
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
      "avatar_url": self.avatar_url,
      "cover_url": self.cover_url,
      "email": self.email
      # "comments": [comment.to_dict() for comment in comments]
    }
