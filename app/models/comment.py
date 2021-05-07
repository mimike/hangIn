from flask_login import UserMixin, current_user #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from .db import db
from app.models import User


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key= True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment_text = db.Column(db.String(), nullable=False)


    def to_dict(self):   #{id: asdf, username: asdf}
            return {
                "id": self.id,
                "post_id": self.post_id,
                "author_id": self.author_id,
                "comment_text": self.comment_text,
                # "user": self.user.get_user()
                # "comment_author": current_user
            }
#author, post, comment_text
