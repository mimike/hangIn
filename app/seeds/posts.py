from app.models import db, Post
from faker import Faker
faker = Faker()
import json
import random

def seed_posts():
    pic_list = [
       "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/68670682_10156795678960895_694072019318210560_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=NStd5en57R4AX95Rqom&tn=B-mwjtcTSdVGbGSa&_nc_ht=scontent-msp1-1.xx&oh=bf4c7916e15e27df83248a990d9e4520&oe=60BE149C",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t31.18172-8/18402290_10154581850965895_7194188292456553506_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=2eGUyST3VtkAX_5pVyJ&_nc_ht=scontent-msp1-1.xx&oh=b0e4b24aa980c1eb024cb79e2da09564&oe=60BBA183",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t31.18172-8/18402290_10154581850965895_7194188292456553506_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=2eGUyST3VtkAX_5pVyJ&_nc_ht=scontent-msp1-1.xx&oh=b0e4b24aa980c1eb024cb79e2da09564&oe=60BBA183",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/105990717_10157082896541561_9222893570307527658_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=174925&_nc_ohc=9_D-xsFdLeEAX-aOQXM&_nc_ht=scontent-msp1-1.xx&oh=60636f981b6b74353e6c9253a89a6bf8&oe=60BE3C38"
    ]

    for num in range(100):
        post = Post(author_id=num+1, text_body=faker.paragraph(nb_sentences=5), media_url=pic_list[faker.pyint(min_value=0, max_value=len(pic_list)-1)])
        db.session.add(post)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
