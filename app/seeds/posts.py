from app.models import db, Post
from faker import Faker
faker = Faker()
import json
import random

def seed_posts():
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

    for num in range(100):
        post = Post(author_id=num+1, text_body=faker.paragraph(nb_sentences=5), media_url=piclist[faker.pyint(min_value=0, max_value=len(piclist)-1)])
        db.session.add(post)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
