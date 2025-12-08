from website import create_app, db
from website.models import BlogPost
app = create_app()
app.app_context().push()

post = BlogPost(title="Kriptoqrafiyaya Giriş", content="Bu post real bazadandır.")
db.session.add(post)
db.session.commit()
print("✅ Yeni post əlavə edildi!")
exit()
