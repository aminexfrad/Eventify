import React, { useState } from 'react';
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
  const [searchParams, setSearchParams] = useState({
    date: ''
  });

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setNewEvent({
      title: '',
      description: '',
      date: '',
      address: '',
      category: '',
      price: ''
    });
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedEvent(null);
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setEvents(events.filter(event => event.id !== eventToDelete.id));
    setShowConfirmDelete(false);
    setEventToDelete(null);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    handleCloseForm();
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    handleCloseForm();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <div className='events-container'>
      <h1>Events</h1>
      <button className="add-button" onClick={handleAddClick}>Add Event</button>
      
      <div className='search-form'>
        <h2>Search Events</h2>
        <form>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleSearchChange}
            />
          </label>
        </form>
      </div>
      
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.address}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Price:</strong> ${event.price.toFixed(2)}</p>
              <button className='edit-button' onClick={() => handleEditClick(event)}>Edit</button>
              <button className='delete-button' onClick={() => handleDeleteClick(event)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No events found.</div>
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
          onConfirm={handleConfirmDelete}
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="1"
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

const AddEventForm = ({ event, onChange, onClose, onSubmit }) => {
  return (
    <div className='edit-event-form'>
      <h2>Add Event</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={onChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={event.description}
            onChange={onChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={onChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={event.address}
            onChange={onChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={event.category}
            onChange={onChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={event.price}
            onChange={onChange}
            step="1"
          />
        </label>
        <button type="submit">Add Event</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Events;
