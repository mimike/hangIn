from app.models import db, Post
from faker import Faker
faker = Faker()
import json
import random

def seed_posts():
    pic_list = [
      "https://i.ibb.co/2FCbT0F/14231832-10105927845566810-5020567043774599592-o.jpg",
    "https://i.ibb.co/vsH9Lbk/lisa4.jpg",
"https://i.ibb.co/LnQmqfV/mandy.jpg",
"https://i.ibb.co/DbsRWDR/DSC09061.jpg",
"https://i.ibb.co/F02XTvQ/DSC09110.jpg",
"https://i.ibb.co/qy5C5H8/DSC09066.jpg",
"https://i.ibb.co/9vB75Fj/DSC05168.jpg",
"https://i.ibb.co/g619ZZP/DSC04865.jpg",
"https://i.ibb.co/6wGvPSb/nancy.jpg",
"https://i.ibb.co/Zz6BVMz/jenn3.jpg",
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
