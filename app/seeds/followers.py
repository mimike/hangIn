from app.models import db
from faker import Faker
faker = Faker()

#followerId is User. UserId is followers.
def seed_followers():
    for i in range(400):
        db.session.execute(f'''INSERT INTO follows (follower_id, user_id)
        VALUES ({faker.pyint(min_value = 2, max_value = 101)},{faker.pyint(min_value = 1, max_value = 101)});''')
        db.session.execute(f'''INSERT INTO follows (follower_id, user_id)

        VALUES (1, {faker.pyint(min_value = 2, max_value = 101)});''')
    db.session.commit()

def undo_followers():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
