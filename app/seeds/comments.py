from app.models import db, Comment
from faker import Faker
faker = Faker()
import random

def seed_comments():
    commentlist = [
        'Interesting observation, I echo these thoughts.',
        'Supa smooth!',
        'Wow!!!',
        'This is a wonderful idea.',
        'I love this idea!',
        'Look at you!',
        'I like this a lot.',
        'A really insightful idea. I have a lot of questions.'
    ]
    for num in range(100):
        comment = Comment(post_id=random.randrange(1,101), author_id=random.randrange(1,101), comment_text=commentlist[faker.pyint(min_value=0, max_value=len(commentlist)-1)])
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
