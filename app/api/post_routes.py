from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Post, PostLike, User, Skill, follows
from app.forms.upload_form import UploadForm
# from app.forms.comment_form import CommentForm
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

# GET all posts: : localhost:5000/api/post/12
@post_routes.route('/')
@login_required
def get_posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}

# GET a single post: localhost:5000/api/post/12
@post_routes.route('/<int:id>')
@login_required
def get_single_post(id):
    post = Post.query.get(id)
    return {"post": post.to_dict()}

# POST a single post:
@post_routes.route('', methods=['POST'])
@login_required
def post_post():
    print("POSTFORM")
    form = UploadForm()

    data = request.json
    print("DATA!!!", data)
    if "mediaUrl" not in request.files:
        return {"errors": "image required"}, 400

    media_url = request.files["mediaUrl"]


    if not allowed_file(media_url.filename):
        return {"errors": "file type not permitted"}, 400

    media_url.filename = get_unique_filename(media_url.filename)
    upload = upload_file_to_s3(media_url)
    print("uplaod!!!!!!", upload)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    form['media_url'].data = url   # uploadform variab
    print(request.form["textBody"])
    form['text_body'].data = request.form["textBody"]

    form['csrf_token'].data = request.cookies['csrf_token']
    print("we got to here!!!!!!!")
    print("REQUEST", request)
    if form.validate_on_submit():
        post = Post(
            media_url=form.media_url.data,
            author_id=current_user.id,
            text_body=form.text_body.data
        )
        print(post)
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'error': form.errors}, 401

# PATCH a single post:
# @post_routes.route('/<int:id>', methods=['PATCH'])
# @login_required
# def patch_post(id):
#     form = PatchForm()
#     post = Post.query.get(id)
#     post.media_url = form.media_url.data
#     post.text_body = form.text_body.data
#     # only edit if the post belongs to the user
#     # if Posts.author_id = author_id
#     db.session.commit()
#     return redirect('/')

# DELETE a single post:
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/')
