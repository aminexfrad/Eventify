import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+pymysql://root:@localhost/event_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False