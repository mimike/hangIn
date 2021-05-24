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
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/105990717_10157082896541561_9222893570307527658_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=174925&_nc_ohc=9_D-xsFdLeEAX-aOQXM&_nc_ht=scontent-msp1-1.xx&oh=60636f981b6b74353e6c9253a89a6bf8&oe=60BE3C38",
       "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/132037479_10201037876447444_5129768337750277069_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=174925&_nc_ohc=ZlTyj36n_mkAX_oS57h&_nc_ht=scontent-msp1-1.xx&oh=eb8315d05b2d81448c0c9878a0434e26&oe=60BC982C",
       "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/144144214_10201107698672956_543456819195533010_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ZmtfFNKtN_kAX9LJAs6&_nc_ht=scontent-msp1-1.xx&oh=a4e74db25b948dd3973f06fd09081933&oe=60BED090",
       "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/48393888_4899175835588_3217157102883569664_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=9hwxGC7PLqAAX9hpcWl&_nc_ht=scontent-msp1-1.xx&oh=5556058a746895264e89071c438366a7&oe=60CD1375",
       "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/36087521_10157441704974692_3814438971874738176_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=cinB7dtRZFAAX9FKXlx&_nc_ht=scontent-msp1-1.xx&oh=d60c4c568379941f6fdb14ac404a861c&oe=60CB1D86",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/32458509_4664949260070_8029975993106038784_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=JA1sKOYPBssAX-vJ4xO&_nc_ht=scontent-msp1-1.xx&oh=cb234fc672b1d6f954bd44142cdd7047&oe=60CC8BAE",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/32440424_4664954900211_5979314896666361856_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=2NywTrdj2ZYAX-NKdEz&_nc_ht=scontent-msp1-1.xx&oh=b7e6f921ff5edee4f286ba58f0e2a697&oe=60CA0FF8",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/54799926_4986568500350_2504559725681573888_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=174925&_nc_ohc=DCx9ilRpmjoAX_AuABt&_nc_ht=scontent-msp1-1.xx&oh=46837a9ecea809b354f98b258831384a&oe=60CCC8D7",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/31285962_4645194406211_7441213299120668672_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=174925&_nc_ohc=LwezslQ2sWkAX9Vwsd0&_nc_ht=scontent-msp1-1.xx&oh=d9d184789e1cd49d1658c6cb5c940c04&oe=60C996E1",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t31.18172-8/17545182_4068686273868_5738819897108392369_o.jpg?_nc_cat=111&ccb=1-3&_nc_sid=174925&_nc_ohc=9tIAnjMLfZYAX8gsif8&_nc_ht=scontent-msp1-1.xx&oh=7f70598b550f7867d87745f70877c6f2&oe=60C9F493",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/104202825_10200718475462619_3888687563125005719_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=FXfDRA7iV1QAX_qZNGE&_nc_ht=scontent-msp1-1.xx&oh=beef8eb34c005d127087908027023822&oe=60CCC6A9",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/90877455_10200567978500289_7850133888377552896_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=_a0Se84QRUcAX8VmrAg&_nc_ht=scontent-msp1-1.xx&oh=8f45720de148147d7cb4a114b9dd6fa4&oe=60CCAC17",
        "https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/104301167_10200718473502570_6014009332255373109_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=E5sR1xi-e9oAX_Hu_we&_nc_ht=scontent-msp1-1.xx&oh=ba5785a3ac0967ca9fe38c055cb31b74&oe=60CC9174"


    ]

    for num in range(20):
        post = Post(
            author_id=num+1, text_body=faker.paragraph(nb_sentences=10), media_url=pic_list[faker.pyint(min_value=0, max_value=len(pic_list)-1)])
        db.session.add(post)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
