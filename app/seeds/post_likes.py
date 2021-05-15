from app.models import db, PostLike
import random

def seed_post_likes():
    for num in range(50):
        post_like = PostLike(user_id=random.randrange(1,31), post_id=random.randrange(1,21))
        db.session.add(post_like)
    db.session.commit()

def undo_post_likes():
    db.session.execute('TRUNCATE post_likes RESTART IDENTITY CASCADE;')
    db.session.commit()
