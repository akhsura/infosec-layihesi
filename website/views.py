from flask import Blueprint, render_template
from flask_login import current_user, login_required
from flask import request, redirect, url_for, flash
from .models import db , BlogPost, Comment


views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html", user=current_user)

@views.route('/about')
def about():
    return render_template("haqqimizda.html", user=current_user)

@views.route('/oyunlar')
def oyunlar():
    return render_template("oyunlar.html", user=current_user)

@views.route('/learn')
def learn():
    return render_template("learn.html", user=current_user)

@views.route('/challenge')
def challenge():
    return render_template("challenge.html", user=current_user)

@views.route('/easy')
def easy():
    return render_template('easy.html', user=current_user)

@views.route('/medium')
def medium():
    return render_template('medium.html', user=current_user)

@views.route('/hard')
def hard():
    return render_template('hard.html', user=current_user)


@views.route("/blog")
def blog():
    posts = BlogPost.query.order_by(BlogPost.id.desc()).all()
    return render_template("blog.html", posts=posts, user=current_user)

@views.route("/add_blog", methods=["GET", "POST"])
@login_required
def add_blog():
    if request.method == "POST":
        title = request.form.get("title")
        content = request.form.get("content")

        if not title or not content:
            flash("Başlıq və məzmun boş ola bilməz!", "error")
            return redirect(url_for("views.add_blog"))

        new_post = BlogPost(title=title, content=content, author=current_user.firstName)
        db.session.add(new_post)
        db.session.commit()

        flash("Blog yazısı əlavə olundu ✅", "success")
        return redirect(url_for("views.blog"))

    return render_template("add_blog.html", user=current_user)


@views.route("/blog/<int:post_id>/comment", methods=["POST"])
@login_required  
def add_comment(post_id):
    content = request.form.get("comment")

    if not content:
        flash("Şərh boş ola bilməz!", "error")
        return redirect(url_for("views.blog"))

    
    author = current_user.firstName if current_user.is_authenticated else "Qonaq"

    comment = Comment(content=content, author=author, post_id=post_id)
    db.session.add(comment)
    db.session.commit()

    flash("Şərh əlavə olundu ✅", "success")
    return redirect(url_for("views.blog"))



@views.route("/comment/<int:comment_id>/delete", methods=["POST"])
@login_required 
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    flash("Şərh silindi 🗑️", "success")
    return redirect(url_for("views.blog"))


@views.route("/post/<int:post_id>/delete", methods=["POST"])
@login_required  
def delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash("Blog yazısı silindi 🗑️", "success")
    return redirect(url_for("views.blog"))
