from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Enable CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    app.config.from_object('app.config.Config')
    db.init_app(app)

    with app.app_context():
        from . import routes
        routes.init_routes(app)
        db.create_all()  # Create database tables

    return app