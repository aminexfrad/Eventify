import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';

const Home = () => {


  return (
    <div className='homepage'>
      <div className='homepage-content'>
        <h1>Welcome to Eventify IMSET Sousse! Your ultimate guide to the most exciting events happening in and around Sousse. From cultural festivals to university happenings, discover vibrant experiences tailored for the IMSET community. Stay updated with the latest event details and local weather forecasts, and never miss out on the fun. Start exploring what's happening around you today!</h1>
        <div className='button-container'>
          <a href='/events'><button className='button'>Events</button></a>
        </div>
      </div>

    </div>
  );
}

export default Home;
