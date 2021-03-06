from app.models import db, Comment
from faker import Faker
faker = Faker()
import random

def seed_comments():
    comment_list = [
        'Interesting observation, I echo these thoughts.',
        'Supa smooth!',
        'Cool, cool, cool!',
        'Wow, where is this place?',
        'This is a wonderful idea.',
        'I love this idea!',
        'Look at you! Love this shape',
        'I like this a lot.',
        'A really insightful idea. This is super duper exciting.'
    ]
    for num in range(100):
        comment = Comment(post_id=random.randrange(1,21), author_id=random.randrange(1,101), comment_text=comment_list[faker.pyint(min_value=0, max_value=len(comment_list)-1)])
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
