import React, { useState, useEffect } from 'react';
import './Events.css';
import ConfirmationDialog from '../../components/confirmationDialog/ConfirmationDialog';
// Key Features of the Code
// API Integration: Integrated all CRUD operations (GET, POST, PUT, DELETE) with your Flask backend.
//Component Structure: Includes AddEventForm and EditEventForm within the same file to resolve undefined errors.
// State Management: Manages events using useState and fetches data via useEffect
// The AddEventForm component
const AddEventForm = ({ event, onChange, onClose, onSubmit }) => (
  <div className='edit-event-form'>
    <h2>Add Event</h2>
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={event.title} onChange={onChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={event.description} onChange={onChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={event.date} onChange={onChange} />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={event.address} onChange={onChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={event.category} onChange={onChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={event.price} onChange={onChange} step="0.01" />
      </label>
      <button type="submit">Add Event</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  </div>
);

// The EditEventForm component
const EditEventForm = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className='edit-event-form'>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

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

  // Fetch events from the backend
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
    console.log(newEvent); // Debugging the event data being sent

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        setEvents([...events, addedEvent]);
        handleCloseForm();
      } else {
        const error = await response.json();
        console.error('Error:', error);
      }
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
        <div className='modal'>
          <EditEventForm
            event={selectedEvent}
            onClose={handleCloseForm}
            onUpdate={handleUpdateEvent}
          />
        </div>
      )}

      {isAdding && (
        <div className='modal'>
          <AddEventForm
            event={newEvent}
            onChange={(e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value })}
            onClose={handleCloseForm}
            onSubmit={handleAddEvent}
          />
        </div>
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

export default Events;
