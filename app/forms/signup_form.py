from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):

    email = StringField('email', validators=[DataRequired(), user_exists])
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    headline = StringField('headline')
    about = TextAreaField('about')
    skills = StringField('skills')
    experience = TextAreaField('experience')
    avatarUrl = StringField('avatarUrl')
    coverUrl = StringField('coverUrl')


    # firstName references frontend signnpform
