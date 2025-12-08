from website import create_app
import os

app = create_app()


if __name__ == '__main__':
    print(f'Starting HTTPS server on https://127.0.0.1:5000')
    app.run(debug=True, ssl_context=('cert.pem', 'key.pem'))
