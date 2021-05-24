from app.models import db, Messaging
from faker import Faker
faker = Faker()
import random

def seed_messages():
    message_list = [
        'hi friend.',
        'how are you?',
        'very great',
        'goodbye',
        'yoooooooo',
        'i am so tired and sore'
    ]
    for num in range(100):
        pm = Messaging(
            sender_id=random.randrange(1,101),
            receiver_id=random.randrange(1,101),
            message=message_list[faker.pyint(min_value=0, max_value=len(message_list)-1)],
            created_at=faker.date_time()
            )
        db.session.add(pm)
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
