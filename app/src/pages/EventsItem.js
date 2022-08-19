import React from 'react';
import InfoSection from '../components/InfoSection';

const EventsItem = props =>{
    
    const homeObj = {
        ime_natjecanja:props.event.ime_natjecanja,
        lightBg: props.event.lightBg,
        lightText: props.event.lightText,
        lightTextDesc: props.event.lightTextDesc,
        topLine: props.event.ime_natjecanja,
        headline: props.event.headline,
        description: props.event.description,
        datum: props.event.datum,
        natjecanje_id:props.event.id,
        buttonLabel: 'ODABERI',
        imgStart: '',
        img: require('../images/hcs.PNG'),
        alt: props.event.ime_natjecanja
      };

    return (
        <InfoSection {...homeObj} />
        
    )
}

export default EventsItem;