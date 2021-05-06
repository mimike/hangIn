from app.models import db, follows
from faker import Faker
faker = Faker()

def seed_followers():
    for i in range(100):
        db.session.execute(f'''INSERT INTO followers (follower_id, followed_id)
        VALUES ({faker.pyint(min_value = 1, max_value = 100)},{faker.pyint(min_value = 1, max_value = 100)});''')
    db.session.commit()

def undo_followers():
    db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
    db.session.commit()
