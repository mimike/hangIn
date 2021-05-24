from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from .db import db

class Messaging(db.Model):
    __tablename__ = "messaging"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #foreign key
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    message = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.DateTime, nullable = False)

    #Associations:
    # user(association for user table) Skill.user.email
    sender = db.relationship("User", backref="sender_person", foreign_keys=[sender_id])
    receiver = db.relationship("User", backref="receiver_person", foreign_keys=[receiver_id])

    def to_dict(self):   #{id: 2, skill_name: hoop}
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "message": self.message,
            "created_at": self.created_at
        }
