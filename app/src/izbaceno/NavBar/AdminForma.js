import React, { useState, useEffect } from 'react';

import CompetitionService from '../../services/CompetitionService';



const AdminForma = (props) => {
    const [event, setEvent] = useState({
        ime_natjecanja: ""
    });
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        CompetitionService.getEvents().then(data => {
            setEvents(data);
            console.log(data);
        });
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        CompetitionService.postEvent(event).then(data => {
            const { message } = data;
            resetForm();
            CompetitionService.getEvents().then(getData => {
                setEvents(getData);
                setMessage(message);
            });
        });
    }


    const resetForm = () => {
        setEvent({
            ime_natjecanja: ""
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEvent((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (

        <div className='formaDiv'>

            <h1>NADODAJ NOVO NATJECANJE</h1>

            <form onSubmit={onSubmit}>
                <input
                    type="string"
                    placeholder="ime_natjecanja"
                    value={event.ime_natjecanja}
                    name="ime_natjecanja"
                    required
                    className="input"
                    onChange={handleChange}
                />
                <button type="submit" className="pink_btn">
                    SUBMIT
                </button>

                <br></br>
            </form>

        </div>

    );
};

export default AdminForma;