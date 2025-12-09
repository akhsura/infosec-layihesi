from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db
from sqlalchemy.exc import IntegrityError

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        
        print(f"\n=== LOGIN ATTEMPT ===")
        print(f"Email: {email}")
        print(f"Password length: {len(password)}")

        if not email or not password:
            flash('Email və şifrə daxil edin.', 'error')
            return render_template('login.html', user=current_user)
        
        user = User.query.filter(User.email.ilike(email)).first()
        print(f"User found: {user}")
        
        if not user:
            flash('Email tapılmadı. Qeydiyyatdan keçin.', 'error')
            return render_template('login.html', user=current_user)
        
        print(f"Hash method: {user.password.split(':')[0]}")
        password_check = check_password_hash(user.password, password)
        print(f"Password correct: {password_check}")
        
        if not password_check:
            flash('Şifrə səhvdir. Yenidən yoxlayın.', 'error')
            return render_template('login.html', user=current_user)
        
        login_user(user, remember=True)
        flash('Uğurla daxil oldunuz!', 'success')
        return redirect(url_for('views.home'))

    return render_template('login.html', user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Sistemdən çıxıldı.', 'success')
    return redirect(url_for('views.home'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    errors = []
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        first_name = request.form.get('firstName', '').strip()
        password1 = request.form.get('password1', '')
        password2 = request.form.get('password2', '')
        
        print(f"\n=== SIGN UP ATTEMPT ===")
        print(f"Email: {email}")
        print(f"Name: {first_name}")
        print(f"Passwords match: {password1 == password2}")

        
        if not email or len(email) < 4:
            errors.append('Email ən azı 4 simvol olmalıdır.')
        if not first_name or len(first_name) < 2:
            errors.append('Ad ən azı 2 simvol olmalıdır.')
        if password1 != password2:
            errors.append('Şifrələr uyğun gəlmir.')
        if len(password1) < 7:
            errors.append('Şifrə ən azı 7 simvol olmalıdır.')

        if not errors:
            existing_user = User.query.filter(User.email.ilike(email)).first()
            if existing_user:
                errors.append('Email artıq mövcuddur.')
            else:
                try:
                    
                    hashed_password = generate_password_hash(password1, method='scrypt')
                    print(f"Hash method: {hashed_password.split(':')[0]}")
                    
                    new_user = User(
                        email=email,
                        firstName=first_name,
                        password=hashed_password
                    )
                    db.session.add(new_user)
                    db.session.commit()
                    
                    print(f"✅ User created successfully!")
                    
                    login_user(new_user, remember=True)
                    flash('Hesab yaradıldı!', 'success')
                    return redirect(url_for('views.home'))
                    
                except IntegrityError:
                    db.session.rollback()
                    errors.append('Hesab yaradılarkən xəta baş verdi.')
                except Exception as e:
                    db.session.rollback()
                    print(f"ERROR: {e}")
                    errors.append(f'Xəta: {str(e)}')

    return render_template('sign_up.html', errors=errors, user=current_user)
