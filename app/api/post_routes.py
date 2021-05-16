from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Post, PostLike, User, Skill, Comment
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
    #likes = PostLike.query.filter(PostLike.post_id == id)


    return {"post": post.to_dict()}

# POST a single post:
@post_routes.route('', methods=['POST'])
@login_required
def post_post():

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

# PATCH a single post: //doesn't work??
@post_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_post(id):
    form = UploadForm()  #new instance of fomr
    post = Post.query.get(id)
    if(post.author_id == current_user.id): # front end needs
        if(form.media_url.data):
            post.media_url = form.media_url.data
        if(form.text_body.data):
            post.text_body = form.text_body.data
        # only edit if the post belongs to the user
        # if Posts.author_id = author_id
        db.session.add(post)
        db.session.commit()
    return redirect('/')

# DELETE a single post: localhost:5000/api/posts/1 works
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if(post):
        db.session.delete(post)
        db.session.commit()
        return jsonify("deleted!")
    return jsonify("failed")

#GET all posts for a single User WORKS!
#localhost:5000/api/posts/user/1
@post_routes.route('/user/<int:id>')
@login_required
def get_user_posts(id):
    posts = Post.query.filter_by(author_id=id).all()
    print("1111111111", posts)
    return {"posts": [post.to_dict() for post in posts]}




# COMMENT ROUTES.....

# POST a Comment  ?? not tested
# localhost5000:api/posts/12/comments
@post_routes.route('/comments', methods=['POST'])
@login_required
def post_comment():
    #print(request.form['commentText'])
    #print(request.get_json())
    addedComment = Comment(
        author_id = current_user.id,
        post_id = request.json["postId"],  #form vs .json
        comment_text = request.json['commentText']

    )
    db.session.add(addedComment)
    db.session.commit()
    return addedComment.to_dict() #redirect('/feed)

#DELETE a Comment  ?? doesn't work.
@post_routes.route('/<int:id>/comments', methods=['DELETE'])
@login_required
def delete_comment(commentId): #commentId frontEnd state varaiable name?
    comment = Comment.query(commentId)
    db.session.delete(commentId)
    db.session.commit()
    return redirect ('/feed')  # redirect vs return {"delete": "post deleted!"}


#LIKES

#GET all likes for a Post

# Like a Post <3 WORKS!
# localhost5000:api/posts/like/3 likeId
@post_routes.route('/like', methods=['POST'])
@login_required
def like_post():
    liked_post_id = request.json["post_id"]

    existing_like = PostLike.query.filter(
        PostLike.post_id == liked_post_id,
        PostLike.user_id == current_user.id
    ).first()

    if existing_like:
        return {"message": "like exists"}, 500
    like = PostLike(
        user_id = current_user.id,
        post_id = liked_post_id
    )
    db.session.add(like)
    db.session.commit()
    return {"post_id": like.post_id}
#  { "post_id": 1}

#Unlike a Post WORKS!!
#localhost5000:api/posts/comments/12
@post_routes.route('/like', methods = ['DELETE'])
@login_required
def unlike_post():
    post_id = request.json["post_id"]
    like = PostLike.query.filter(
        PostLike.post_id == post_id,
        PostLike.user_id == current_user.id
    ).first()

    db.session.delete(like)
    db.session.commit()
    return {"post_id":  post_id}
#  { "post_id": 1} if we dont have this info, we can't manipulate the state and we will have to do it in the store
