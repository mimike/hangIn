from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class UploadForm(FlaskForm):
    #url StringFieldd andcaption
    media_url = StringField('mediaUrl', validators=[DataRequired()])
    text_body = StringField('textBody', validators=[DataRequired()])
    