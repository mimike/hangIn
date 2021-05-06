from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from .db import db

class PostLike(db.Model):
    __tablename__ = "post_likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

    #association

    # since it's backref, we don't have to have the association here but.... like_post,
    #  PostLike.like_post.author_id
    # getting all the posts associated with the likes (of the author )
