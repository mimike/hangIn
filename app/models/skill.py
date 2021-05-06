from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from .db import db



class Skill(db.Model):
    __tablename__ = "skills"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #foreign key
    skill_name = db.Column(db.String())

    #Associations:
    # user(association for user table) Skill.user.email

    def to_dict(self):   #{id: 2, skill_name: hoop}
        return {
            "id": self.id,
            "skill_name": self.skill_name,
            "user_id": self.user_id,
            "user": self.user.to_dict(),
        }
