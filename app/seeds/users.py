# from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
faker = Faker()
import requests
import json
import random

# Adds a demo user, you can add other users here if you want
def seed_users():

    cover_url = 'https://api.unsplash.com/search/photos/?query=dancer&orientation=landscape&count=1&client_id=07qS1QI2QpK4vPhuXLhH-f91DBQ5vGm9_flqItFuJKc'

    r = requests.get(cover_url)
    response = r.json()
    new_list = []
    photo_object = response["results"]
    for photo in photo_object:
        new_list.append(photo["urls"]["regular"])

    piclist = [
        "https://www.mimikeaerial.com/gallery-1?pgid=jcosfzqj-63b10457-0c43-486c-8f77-fb7c0d2ac42c",
        "https://www.mimikeaerial.com/gallery-1?pgid=jcosfzqj-32d7ff95-7e42-4e99-91e2-7d4d106d9380",
        "https://www.mimikeaerial.com/gallery-1?pgid=jcosfzqj-94a4cc1f-1df9-4c4e-a25f-c899ffb3740e",
        "https://www.mimikeaerial.com/gallery-1?pgid=jcosfzqj-591d29fe-730e-4f54-874a-89c2070fe230",
        "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-04508de1-d641-4f90-a126-45ac598fb321",
        "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-ee30e6fb-1867-4da0-a6c8-678635bee331",
        "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-ddd9571a-9275-440a-b2da-6e6bcada36e6",
         "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-d640133e-d5a5-4e26-99de-bb17c11b4e7b",
        "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-6abf5abf-a612-4fc4-8115-364ff5e16877",
         "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-f155e7e7-1cb5-4bf4-8c3a-63696a832950",
        "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-dd67e183-9d60-4586-a8d1-14c7a51459df",
         "https://www.sarahflyaerial.com/gallerygrid?pgid=kjvkz4oy-afbab4c5-aefb-4294-84ff-8cd3a7c91383"
    ]

    demo = User(first_name="Mimi", last_name="Key", headline="Aerialist | Choreographer", city="Chicago", state="Illinois", avatar_url="https://www.mimikeaerial.com/gallery-1?pgid=jcosfzqj-9265d3bb-ebc6-4a70-8bc8-07d14ef0d850", email='demo@aa.io',
                password='password')
    db.session.add(demo)

    for num in range(100):
        user=User(first_name=faker.first_name_nonbinary(), last_name = faker.last_name(), headline = faker.job(), city = faker.city(), state = faker.state(), avatar_url = piclist[faker.pyint(min_value=0, max_value=len(piclist)-1)], cover_url=new_list[random.randrange(0, len(new_list) -1)],email=faker.email(), password = faker.password(length=7))

        db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
