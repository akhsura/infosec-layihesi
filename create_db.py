from website import create_app, db
from website.models import User, Note, BlogPost, Comment

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

print("Database tables recreated!")
