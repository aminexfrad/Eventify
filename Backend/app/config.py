import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://event_user:your_password@localhost/event_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False