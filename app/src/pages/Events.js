import React, { useEffect, useState } from 'react';
import CompetitionService from '../services/CompetitionService';
import EventsItem from './EventsItem';

const Events = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    CompetitionService.getEvents().then(data => {
      setEvents(data);
      console.log(data);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        height: '95vh'
      }}

      
    >

      {
        events.map(event => {
          return <EventsItem key={event.id} event={event} />
        })
      }

    </div>
  );
};

export default Events;