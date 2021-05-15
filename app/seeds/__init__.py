from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .post_likes import seed_post_likes, undo_post_likes
from .followers import seed_followers, undo_followers
from .skills import seed_skills, undo_skills

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_skills()
    seed_comments()
    seed_post_likes()
    seed_followers()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_skills()
    # Add other undo functions here
    undo_posts()
    undo_comments()
    undo_post_likes()
    undo_followers()
