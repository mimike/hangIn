from app.models import db, Skill
from faker import Faker
faker = Faker()
import random

def seed_skills():
    skilllist = [
        'Lyra',
        'Fabric',
        'Dance trapeze',
        'Static trapeze',
        'Dance trapeze',
        'Flying trapeze',
        'Corde lisse',
        'Pole',
        'Chinese pole',
        'Hammock',
        'Invented apparatus'
    ]
    for num in range(100):
        skill = Skill(user_id=num+1, skill_name=skilllist[faker.pyint(min_value=0, max_value=len(skilllist)-1)])
        db.session.add(skill)
    db.session.commit()


def undo_skills():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
