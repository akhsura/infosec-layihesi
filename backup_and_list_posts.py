import os, shutil, datetime
from website import create_app
from website.models import BlogPost

BASE = os.path.abspath(os.path.dirname(__file__))
DB_REL = os.path.join('instance', 'database.db')
DB_PATH = os.path.join(BASE, DB_REL)

if not os.path.exists(DB_PATH):
    print(f"Database not found at {DB_PATH}")
    raise SystemExit(1)

# Backup
ts = datetime.datetime.now().strftime('%Y%m%dT%H%M%S')
bak_path = DB_PATH + f'.bak.{ts}'
shutil.copy2(DB_PATH, bak_path)
print(f"Backed up database to: {bak_path}\n")

# List posts
app = create_app()
with app.app_context():
    posts = BlogPost.query.order_by(BlogPost.id).all()
    if not posts:
        print('No BlogPost entries found.')
    else:
        print(f'Found {len(posts)} BlogPost entries:\n')
        for p in posts:
            content_preview = (p.content or '')[:300].replace('\n', ' ') 
            print(f'ID: {p.id}\nTitle: {p.title}\nDate: {getattr(p, "date_posted", "-")}' )
            print('Preview:', content_preview)
            print('-'*60)

print('\nCompleted.')
