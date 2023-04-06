from flask import Flask, session


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret123'

users = ["blue", "yellow"]

@app.route('/')
def index():
    if "username" in session and session["username"] in users:
        return f'<h1>You are logged in as {session["username"]}!</h1>'
    else:
        return '<h1>Access Denied</h1>', 403


if __name__ == '__main__':
    app.run()
