from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    print("HEEEELL!!!!!!!!!!!!")
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400

    for what in request.files:
        print(what)

    image = None
    upload = None
    url = None

    if (request.files):
        image = request.files["avatar"]
        # image2 = request.files["coverUrl"]


        if not allowed_file(image.filename):
        # or not allowed_file(image2.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)
        # image2.filename = get_unique_filename(image2.filename)
        upload = upload_file_to_s3(image)
        # upload2 = upload_file_to_s3(image2)

        if "url" not in upload:
        # or "url" not in upload2:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400
        url = upload["url"]
        # url2 = upload["url"]

        form['url'].data = url
        # form['cover_url'].data = url2

    form['csrf_token'].data = request.cookies['csrf_token']
    print(request.get_json())
    if form.validate_on_submit():
        user = User(
            first_name=request.form['firstName'],
            last_name=request.form['lastName'],
            city=request.form['city'],
            state=request.form['state'],
            headline=request.form['headline'],
            about=request.form['about'],
            email=request.form['email'],
            password=request.form['password'],
            avatar_url=url,
            # cover_url= url2

        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
