const ScoresService ={
  getScores : ()=>{
      return fetch('/scores/bodovi')
              .then(response=>{
                  if(response.status !== 401){
                      return response.json().then(data => data);
                  }
                  else
                      return {message : {msgBody : "UnAuthorized",msgError : true}};
              });
  },
  postScores : event=>{
      return fetch('/scores/newscore',{
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
  }
  
}

export default ScoresService;