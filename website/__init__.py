import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    instance_dir = os.path.join(os.environ.get('TEMP', '/tmp'), 'flask_instance')
    os.makedirs(instance_dir, exist_ok=True)
    db_path = os.path.join(instance_dir, DB_NAME)
    app.config['SECRET_KEY'] = 'ncksjdof'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    db.init_app(app)

    from .views import views
    from .auth import auth
    from .api_auth import api_auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(api_auth, url_prefix='/api')

    from .models import User, Note

    create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

def create_database(app):
    db_path = os.path.join(os.environ.get('TEMP', '/tmp'), 'flask_instance', DB_NAME)
    if not path.exists(db_path):
        with app.app_context():
            db.create_all()
        print('Created Database!')
