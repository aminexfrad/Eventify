from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration de la base de données PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/events_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialisation de SQLAlchemy et CORS
db = SQLAlchemy(app)
CORS(app)

# Définition du modèle Event
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

# Création des tables dans la base de données
with app.app_context():
    db.create_all()

# Routes de l'API
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': event.id,
        'title': event.title,
        'description': event.description,
        'date': event.date.strftime('%Y-%m-%d'),
        'address': event.address,
        'category': event.category,
        'price': event.price
    } for event in events])

@app.route('/events', methods=['POST'])
def add_event():
    data = request.json
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
        return jsonify({'message': 'Event added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/events/<int:id>', methods=['PUT'])
def update_event(id):
    data = request.json
    event = Event.query.get(id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    try:
        event.title = data['title']
        event.description = data['description']
        event.date = data['date']
        event.address = data['address']
        event.category = data['category']
        event.price = data['price']
        db.session.commit()
        return jsonify({'message': 'Event updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    try:
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Point d'entrée de l'application
if __name__ == '__main__':
    app.run(debug=True)
