import axios from 'axios';

const osnovniURL ='/competitions';

const CompetitionService ={
    getEvents : ()=>{
        return fetch('/competitions/events')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    postEvent : event=>{
        return fetch('/competitions/newevent',{
            method : "post",
            body : JSON.stringify(event),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    },

    deleteEvent : id => {
        return axios.delete(`${osnovniURL}/${id}`)
    },

    getEvent : id => {
        return axios.get(`${osnovniURL}/${id}`)
    },
    
}

export default CompetitionService;