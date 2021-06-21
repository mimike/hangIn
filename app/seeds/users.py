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

    pic_list = [
        'https://hangin.s3.us-east-2.amazonaws.com/april.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mandy.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/jess.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/maya.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/sarah.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/nancy.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mimi7.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mimi6.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mimi5.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mimi4.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mimi3.jpeg',
        'https://hangin.s3.us-east-2.amazonaws.com/mimi2.jpeg'

    ]

    demo = User(
        first_name="Meme",
        last_name="Fly",
        headline="Aerialist | Choreographer | Teacher",
        city="Leadville",
        state="Colorado",
        about="After 500 years as a Javascript Ninjess in the land of Among Us, Mimi metamorphosized into an aerial dancer. She believes in improvisation as the most fluid way to create work.  Her approach as a performer is greatly influenced by twenty years of dance training and her background as a yoga practitioner and teacher.  She is an energetic and soulful mover who lights up any event blending classical lines, story telling and genuine connection with her audience.",
        experience="Warlos School of Flying: 1972-1999",
        main_skills="Fabric",
        avatar_url="https://hangin.s3.us-east-2.amazonaws.com/mimi5.jpeg",
        cover_url="https://hangin.s3.us-east-2.amazonaws.com/mimicover.jpeg",
        email='demo@aa.io',
        password='password'
        )
    db.session.add(demo)

    skills_list =[
        'Fabric',
        'Hoop',
        'Static trapeze',
        'Corde lisse',
        'Pole',
        'Chinese pole',
        'Hammock',
        'Invented apparatus'
    ]

    for num in range(100):
        user=User(
            first_name=faker.first_name_nonbinary(),
            last_name = faker.last_name(),
            headline = faker.job(),
            city = faker.city(),
            state = faker.state(),
            avatar_url = pic_list[faker.pyint(min_value=0, max_value=len(pic_list)-1)],
            main_skills = skills_list[faker.pyint(min_value=0, max_value=len(skills_list)-1)],
            about=faker.paragraph(nb_sentences=10),
            experience=faker.paragraph(nb_sentences=10),
            cover_url=new_list[random.randrange(0, len(new_list) -1)],
            email=faker.email(),
            password = faker.password(length=7)
            )
        db.session.add(user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
