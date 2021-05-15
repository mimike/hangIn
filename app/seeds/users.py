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
    print("api here")
    pic_list = [
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/33511491_4674909669074_3860000440217239552_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=mimfYEtLwacAX-h9jq0&tn=JWSOvWr-z0BXHxBi&_nc_ht=scontent-msp1-1.xx&oh=b7ed98adff249601e6e06d2487686d65&oe=60BB4C92",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/48413309_4899175355576_999433533954981888_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=HK1h-V9LR3sAX84jUot&_nc_ht=scontent-msp1-1.xx&oh=615dceb3a50eb5fa0ed0a81c2706c72d&oe=60BCE92C",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/48416994_4899176435603_6464504905280258048_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=ktyIFzXOJy4AX-B74eA&_nc_ht=scontent-msp1-1.xx&oh=3a0dce9a1b56b6337a01bdf3943a1eab&oe=60BC84ED",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/48954489_4899170115445_8356632178934677504_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=QqdC4YaawIQAX9lQFyp&_nc_ht=scontent-msp1-1.xx&oh=3b3f364c91ad3c537a317d0a852881ae&oe=60BE0FAD",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/32583339_4664951500126_7456231232091717632_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=ckOX8Rwv1z0AX95hDp8&_nc_ht=scontent-msp1-1.xx&oh=e80cddf1679e0c5647b5892cf649aadf&oe=60BC0FD6",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/32594132_4664956660255_5983733717934276608_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=IC8TTr6TVb8AX9uT3PT&_nc_ht=scontent-msp1-1.xx&oh=01290763d279430815ab3662257271e4&oe=60BDF0ED",

        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/32651611_10155341870901561_2405478141582639104_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=84a396&_nc_ohc=BQyi2jekL0QAX9ZVDRl&_nc_oc=AQnIJO8MFAw7TNN26g6qI_rmMWaQylz5dRwHUWKrYnmO2_l_xeBjlcie9R_hGGZ0OTo&_nc_ht=scontent-msp1-1.xx&oh=c9926e3594a4d5915d5f3dd5bb4409a6&oe=60BEB8D7",

        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/34074313_10155740465610895_2058402289659412480_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ad2b24&_nc_ohc=a7KbwmJH684AX-Lc-vL&_nc_ht=scontent-msp1-1.xx&oh=faca30644b463bbe0c9ab930c3f9ba77&oe=60BB173B",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/50521873_10155827891771561_5345451408235692032_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=730e14&_nc_ohc=bpxK9JMg3GoAX9Q7SsE&_nc_oc=AQlx3Jz-Atsd0Wdun-DV2Wy6IOnOm8-7CEG4Bx2LSMPCJgDUu-IFjXQ0rNp1CpYMUAk&_nc_ht=scontent-msp1-1.xx&oh=a2dfd0c29ac51db0a1a48eb2e321e409&oe=60BE5DBB",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/68623794_10200283365425140_6812155118885011456_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=d6lPvAMvS8gAX8999rt&_nc_ht=scontent-msp1-1.xx&oh=b0c7f28566c1c8ad5fd4c7fc5236e230&oe=60BB118A",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/69067233_10157520332189222_1216775084044189696_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=MXgT4gkhV2cAX9ZuU_L&_nc_ht=scontent-msp1-1.xx&oh=7cb293e2c7ad79f25e8430d6f3a91b63&oe=60BE74A0",

        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/68895436_10200283366745173_7684750116741185536_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=zcYQ1rWZg_oAX-Hicns&_nc_ht=scontent-msp1-1.xx&oh=d79a3bc85f7e1b5ebb8fc199db9586c8&oe=60BD21D5",

        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/68670682_10156795678960895_694072019318210560_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=NStd5en57R4AX95Rqom&tn=B-mwjtcTSdVGbGSa&_nc_ht=scontent-msp1-1.xx&oh=bf4c7916e15e27df83248a990d9e4520&oe=60BE149C",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t31.18172-8/18402290_10154581850965895_7194188292456553506_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=2eGUyST3VtkAX_5pVyJ&_nc_ht=scontent-msp1-1.xx&oh=b0e4b24aa980c1eb024cb79e2da09564&oe=60BBA183",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t31.18172-8/18402290_10154581850965895_7194188292456553506_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=2eGUyST3VtkAX_5pVyJ&_nc_ht=scontent-msp1-1.xx&oh=b0e4b24aa980c1eb024cb79e2da09564&oe=60BBA183",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/105990717_10157082896541561_9222893570307527658_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=174925&_nc_ohc=9_D-xsFdLeEAX-aOQXM&_nc_ht=scontent-msp1-1.xx&oh=60636f981b6b74353e6c9253a89a6bf8&oe=60BE3C38"
    ]
    print("after pic list!")
    demo = User(
        first_name="Mimi",
        last_name="K",
        headline="Aerialist | Choreographer",
        city="Chicago",
        state="Illinois",
        about="I've been a software engineer for more than two decades. I've coded in dozens of programming languages and worked with teams and companies of all sizes. I find value in working with diverse teams, because each individual can give new insights into any project, and my favorite aspect of my career has always been mentoring others. Now I get to use my skills and experience to instruct a new generation of programmers in the art of coding.",
        experience="15 years of they usually perform as part of a group and know a variety of dance styles, including ballet, tap, and modern dance. In addition to traditional performances in front of a live audience, many perform on TV, in videos on the Internet, and in music videos, in which they also may sing or act. Many dancers perform in shows at casinos, in theme parks, and on cruise ships.",
        main_skills="Fabric",
        avatar_url="https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/46636067_4869486253367_7726473666732490752_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=O9iItk8vEzcAX9mCQo2&_nc_ht=scontent-msp1-1.xx&oh=64324826657ae61f4751f2e2b7fea7aa&oe=60C247F3",
        cover_url="https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/32247261_4662155230221_6666452128644464640_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=19026a&_nc_ohc=vIh0ZNiE2yoAX9U8A_y&tn=P88s18J4M9h37Kox&_nc_ht=scontent-msp1-1.xx&oh=3cdfe1a83e5b357ec81ae5c463434b60&oe=60BC4E1C",
        email='demo@aa.io',
        password='password'
        )
    db.session.add(demo)
    print("before skillz!!")
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
    print("after pic list!")
    for num in range(100):
        user=User(
            first_name=faker.first_name_nonbinary(),
            last_name = faker.last_name(),
            headline = faker.job(),
            city = faker.city(),
            state = faker.state(),
            avatar_url = pic_list[faker.pyint(min_value=0, max_value=len(pic_list)-1)],
            main_skills = skills_list[faker.pyint(min_value=0, max_value=len(skills_list)-1)],
            about=faker.paragraph(nb_sentences=6),
            experience=faker.paragraph(nb_sentences=6),
            cover_url=new_list[random.randrange(0, len(new_list) -1)],
            email=faker.email(),
            password = faker.password(length=7)
            )
        db.session.add(user)
    print("after add user!")
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
