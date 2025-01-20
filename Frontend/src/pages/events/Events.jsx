import React, { useState, useEffect } from 'react';
import './Events.css';
import ConfirmationDialog from '../../components/confirmationDialog/ConfirmationDialog';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    category: '',
    price: ''
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const API_URL = 'http://127.0.0.1:5000/events';

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      const addedEvent = await response.json();
      setEvents([...events, addedEvent]);
      handleCloseForm();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`${API_URL}/${updatedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        setEvents(events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        ));
        handleCloseForm();
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/${eventToDelete.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventToDelete.id));
        setShowConfirmDelete(false);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedEvent(null);
  };

  return (
    <div className='events-container'>
      <h1>Events</h1>
      <button className="add-button" onClick={() => setIsAdding(true)}>Add Event</button>
      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.address}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Price:</strong> ${event.price}</p>
              <button className='edit-button' onClick={() => { setSelectedEvent(event); setIsEditing(true); }}>Edit</button>
              <button className='delete-button' onClick={() => { setEventToDelete(event); setShowConfirmDelete(true); }}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {isEditing && selectedEvent && (
        <EditEventForm event={selectedEvent} onClose={handleCloseForm} onUpdate={handleUpdateEvent} />
      )}

      {isAdding && (
        <AddEventForm event={newEvent} onChange={(e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value })} onClose={handleCloseForm} onSubmit={handleAddEvent} />
      )}

      {showConfirmDelete && (
        <ConfirmationDialog
          message={`Are you sure you want to delete the event titled "${eventToDelete.title}"?`}
          onConfirm={handleDeleteEvent}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </div>
  );
};

const EditEventForm = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onUpdate(formData); }}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

const AddEventForm = ({ event, onChange, onClose, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type="text" name="title" value={event.title} onChange={onChange} placeholder="Title" />
    <textarea name="description" value={event.description} onChange={onChange} placeholder="Description" />
    <input type="date" name="date" value={event.date} onChange={onChange} />
    <input type="text" name="address" value={event.address} onChange={onChange} placeholder="Address" />
    <input type="text" name="category" value={event.category} onChange={onChange} placeholder="Category" />
    <input type="number" name="price" value={event.price} onChange={onChange} placeholder="Price" />
    <button type="submit">Add Event</button>
    <button type="button" onClick={onClose}>Cancel</button>
  </form>
);

export default Events;
