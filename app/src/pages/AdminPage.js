import React, { useState, useEffect } from 'react';
import './categories.css';
import CompetitionService from '../services/CompetitionService';
import Message from './Message';
import DogadajInfo from './DogadajInfo';


const AdminPage = (props) => {
    const [event, setEvent] = useState({
        ime_natjecanja: "",
        lightBg: "",
        lightText: "",
        lightTextDesc: "",
        headline: "",
        description: "",
        datum: "",
        cat_pom: "",
        cat_hh: ""
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
            ime_natjecanja: "",
            lightBg: "",
            lightText: "",
            lightTextDesc: "",
            headline: "",
            description: "",
            datum: "",
            cat_pom: "",
            cat_hh: ""
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


    const deleteCompetition = (id) => {
        CompetitionService
            .deleteEvent(id)
            .then(response => {
                setEvents(events.filter(event => event.id !== id))
            })
    };


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'black',
                alignItems: 'center',
                height: '95vh',

            }}
        >
            <div className="score_container">
                <div className="score_form_container">
                    <div className="left">
                        <h1>NADODAJ NOVO NATJECANJE</h1>

                        <form className="form_container" onSubmit={onSubmit}>


                            <input
                                type="string"
                                placeholder="ime_natjecanja"
                                value={event.ime_natjecanja}
                                name="ime_natjecanja"
                                required
                                className="input"
                                onChange={handleChange}
                            />



                            <input
                                type="bool"
                                placeholder="lightBg"
                                name="lightBg"
                                value={event.lightBg}
                                required
                                className="input"
                                onChange={handleChange}
                            />


                            <input
                                type="bool"
                                placeholder="lightText"
                                name="lightText"
                                value={event.lightText}
                                required
                                className="input"
                                onChange={handleChange}
                            />



                            <input
                                type="bool"
                                placeholder="lightTextDesc"
                                name="lightTextDesc"
                                value={event.lightTextDesc}
                                required
                                className="input"
                                onChange={handleChange}
                            />


                            <input
                                type="string"
                                placeholder="headline"
                                value={event.headline}
                                name="headline"
                                required
                                className="input"
                                onChange={handleChange}
                            />


                            <input
                                type="string"
                                placeholder="description"
                                value={event.description}
                                name="description"
                                required
                                className="input"
                                onChange={handleChange}
                            />

                            <input
                                type="date"
                                placeholder="datum"
                                value={event.datum}
                                name="datum"
                                required
                                className="input"
                                onChange={handleChange}
                            />


                            <input
                                type="string"
                                placeholder="cat_pom"
                                value={event.cat_pom}
                                name="cat_pom"
                                required
                                className="input"
                                onChange={handleChange}
                            />



                            <input
                                type="string"
                                placeholder="cat_hh"
                                value={event.cat_hh}
                                name="cat_hh"
                                required
                                className="input"
                                onChange={handleChange}
                            />
                            <br></br>
                            <button type="submit" className="pink_btn">
                                SUBMIT
                            </button>

                            <br></br>
                        </form>
                        {message ? <Message message={message} /> : null}
                    </div>
                </div>
            </div>


            
                <div>
                    <div >
                        <h1>IZBRISI NATJECANJE</h1>

                        <div className='sidebar'>
                            <ul>
                                {events.map(p =>
                                    <DogadajInfo key={p.id} dogadaj={p} brisiDogadaj={() => deleteCompetition(p.id)} />)}
                            </ul>

                        </div>
                    </div>
                </div>
            

        </div>
    );
};

export default AdminPage;