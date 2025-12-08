from website import create_app, db
from website.models import BlogPost

app = create_app()

with app.app_context():
    print("Listing BlogPost entries BEFORE deletion:")
    posts_before = BlogPost.query.all()
    for p in posts_before:
        print(f"- ({p.id}) {p.title}")

    # Delete posts with ID > 4 (the duplicates)
    to_delete = BlogPost.query.filter(BlogPost.id > 4).all()
    if not to_delete:
        print("No posts found to delete.")
    else:
        for p in to_delete:
            print(f"Deleting: ({p.id}) {p.title}")
            db.session.delete(p)
        db.session.commit()
        print(f"Deleted {len(to_delete)} posts.")

    print("Listing BlogPost entries AFTER deletion:")
    posts_after = BlogPost.query.all()
    for p in posts_after:
        print(f"- ({p.id}) {p.title}")

    print("Done.")
