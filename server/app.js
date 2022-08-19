const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter =require('./controllers/users')
const competitionsRouter =require('./controllers/competitions')
const scoresRouter =require('./controllers/scores')
const mongoose = require('mongoose')
require('passport');
const User =require('./models/osoba');
const {Competition, Scores} =require('./models/competition');
const cookieParser = require('cookie-parser');
logger.info('Spajam se na')

mongoose.connect(config.DB_URI)
 .then(result => {
 logger.info("Spojeni smo na bazu");
 }).catch(error => {
 logger.greska("Greška pri spajanju", error.message);
 })

app.use(cors())

app.use(cookieParser());

app.use(express.json())

app.use(express.static('build'))
app.use(middleware.zahtjevInfo)

/* const competitionInput= {
    ime_natjecanja: "adriatic",
        datum: "2021-12-23",
        cat_pom: [
            "Cheerleading club Noa",
            "Sedmi Vjetar"
        ],
        cat_hh: [
            "Cheerleading club Noa",
            "Sedmi vjetar"
        ]
}

const competition = new Competition (competitionInput);
competition.save((err,document)=>{
    if(err)
        console.log(err);
    console.log(document);
}) */

app.use('/user', usersRouter)
app.use('/competitions', competitionsRouter)
app.use('/scores', scoresRouter)


app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)

module.exports = app
