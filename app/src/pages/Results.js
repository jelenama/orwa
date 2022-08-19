import React, { useState } from 'react';
//import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";
import ScoresService from '../services/ScoresService';
import CompetitionService from '../services/CompetitionService';
import { useLocation } from 'react-router-dom'
import { Button } from '../globalStyles';
import ResultsInfo from './ResultsInfo';
import './table.css';

const Results = () => {

    const [rezultati, setRezultati] = useState([]);
    const [events, setEvents] = useState("");
    const location = useLocation()
    const { id } = location.state

    const dohvatiNatjecanje = () => {
        CompetitionService
            .getEvent(id)
            .then(response => {
                console.log(response.data);
                setEvents(response.data)
            });
            ScoresService.getScores().then(data => {
                setRezultati(data);
                console.log(data);
            });       
    };

    const scoresZaIspis = rezultati.filter(rezultat => rezultat.natjecanje_id === id);
    const scoresPom=scoresZaIspis.filter(rez=> rez.cat_pom_score !== 0);
    const scoresHH=scoresZaIspis.filter(rez=> rez.cat_hh_score !== 0);

    const sortedDataPom =[...scoresPom].sort((a,b)=>{
        return a.cat_pom_score < b.cat_pom_score ? 1 : -1
    })

    const sortedDataHH =[...scoresHH].sort((a,b)=>{
        return a.cat_hh_score < b.cat_hh_score ? 1 : -1
    })
       
    return (
        <div>
            <Button onClick={dohvatiNatjecanje}> REZULTATI</Button>
            <div>
                NATJECANJE : {events} 
            </div>
            <h1>CHEER POM</h1>
             <div>

                <ResultsInfo rezultati={sortedDataPom}/>
            </div>
            <h1>CHEER HIP HOP</h1>
            <div>

                <ResultsInfo rezultati={sortedDataHH} />
            </div>
            
        </div>


    );
};

export default Results;

