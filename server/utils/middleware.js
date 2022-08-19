const logger =require('../utils/logger');
const express = require('express');
const app=express();

const nepoznataRuta =(req,res)=>{
    res.status(404).send({error:'nepostojeca ruta'})
}

app.use(nepoznataRuta);

const errorHandler =(err,req,res, next)=>{

    //logger.log(err.message);

    if(err.name=='CastError'){
        return res.status(400).send({error:'Wrong format ID parameter.'})
    } else if(err.name=='ValidationError'){

        return res.status(400).send({error:'Wrong format data'})
    } else if (err.name === 'JsonWebTokenError'){
        return res.status(400).send({error: 'Neispravni token'})
    }
    next(err)
}

const zahtjevInfo =(req,res,next)=>{
    logger.info('Metoda:', req.method)
    logger.info('Putanja',req.path)
    logger.info('Tijelo:', req.body)
    logger.info('---')
    next()
}

module.exports={nepoznataRuta, errorHandler,zahtjevInfo};
