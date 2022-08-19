import React from 'react';
//import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";
import background from "../images/noa.jpg";


const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        alignItems: 'center',
        height: '95vh',
        backgroundImage:  `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
      }}
    >
      <h1>Home</h1>
      
    </div>
  );
};

export default Home;