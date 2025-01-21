from flask import jsonify, request
from . import db  
from .models import Event


def init_routes(app):
    @app.route('/events', methods=['GET'])
    def get_events():
        city = request.args.get('city')
        date = request.args.get('date')
        query = Event.query
        if city:
            query = query.filter_by(city=city)
        if date:
            query = query.filter_by(date=date)
        events = query.all()
        return jsonify([{
            'id': event.id,
            'title': event.title,
            'description': event.description,
            'date': event.date,
            'city': event.city,
            'address': event.address,
            'category': event.category,
            'price': event.price
        } for event in events])

    @app.route('/events/add', methods=['POST'])
    def add_event():
        data = request.get_json()
        new_event = Event(
            title=data['title'],
            description=data['description'],
            date=data['date'],
            city=data['city'],
            address=data['address'],
            category=data['category'],
            price=data['price']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'message': 'Event added successfully'}), 201

    @app.route('/events/update', methods=['PUT'])
    def update_event():
        data = request.get_json()
        event = Event.query.get(data['id'])
        if event:
            event.title = data['title']
            event.description = data['description']
            event.date = data['date']
            event.city = data['city']
            event.address = data['address']
            event.category = data['category']
            event.price = data['price']
            db.session.commit()
            return jsonify({'message': 'Event updated successfully'})
        return jsonify({'message': 'Event not found'}), 404

    @app.route('/events/delete', methods=['DELETE'])
    def delete_event():
        event_id = request.args.get('id')
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()
            return jsonify({'message': 'Event deleted successfully'})
        return jsonify({'message': 'Event not found'}), 404