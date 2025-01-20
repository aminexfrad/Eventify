from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost:5432/events_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app, resources={r"/events/": {"origins": "*"}})

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        events = Event.query.all()
        return jsonify([{
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date,
            'address': event.address,
            'category': event.category,
            'price': event.price
        } for event in events])

    if request.method == 'POST':
        data = request.get_json()
        try:
            new_event = Event(
                title=data['title'],
                description=data['description'],
                date=data['date'],
                address=data['address'],
                category=data['category'],
                price=data['price']
            )
            db.session.add(new_event)
            db.session.commit()
            return jsonify({
                'id': new_event.id,
                'title': new_event.title,
                'description': new_event.description,
                'date': new_event.date,
                'address': new_event.address,
                'category': new_event.category,
                'price': new_event.price
            }), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
