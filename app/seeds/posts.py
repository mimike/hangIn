from app.models import db, Post
from faker import Faker
faker = Faker()
import json
import random

def seed_posts():
    pic_list = [
      "https://i.ibb.co/yB8hDV7/mimicover.jpg",
      "https://i.ibb.co/0hQMJ6R/april.jpg",
        "https://i.ibb.co/NrYHjCv/april2.jpg",
        "https://i.ibb.co/rtXzcQ0/mimi3.jpg",
        "https://i.ibb.co/KmQ51H3/mimi2.jpg"
    ]

    for num in range(20):
        post = Post(
            author_id=num+1, text_body=faker.paragraph(nb_sentences=12), media_url=pic_list[faker.pyint(min_value=0, max_value=len(pic_list)-1)])
        db.session.add(post)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
