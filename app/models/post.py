from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from .db import db

class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    media_url = db.Column(db.String(), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #foreign key
    text_body = db.Column(db.Text, nullable=False)


    # just a counter of the post likes
    post_likes = db.relationship('PostLike', backref="like_post", cascade="all, delete")
    comments = db.relationship('Comment', backref="post", cascade="all, delete")


    def to_dict(self):   #{id: asdf, username: asdf}
        return {
            "id": self.id,
            "media_url": self.media_url,
            "text_body": self.text_body,
            "comments": [comment.to_dict() for comment in self.comments],
            "author": self.user.to_dict(),  #{id: 34, author: {id: 3, firstname: mimi, etc}}
        }
