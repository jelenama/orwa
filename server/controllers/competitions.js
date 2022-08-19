const competitionsRouter = require('express').Router();

const { Competition } = require('../models/competition');

competitionsRouter.get('/events', async (req, res) => {
   const rezultati= await Competition.find({});
   res.json(rezultati)

})

competitionsRouter.get('/:id', (req, res, next) => {
    Competition.findById(req.params.id)
        .then(competition => {
            if (competition) {
                res.json(competition.ime_natjecanja)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))

})

competitionsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Competition.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))

})


competitionsRouter.post('/newevent', (req, res, next) => {
    const podatak = req.body
    const competition = new Competition({
        ime_natjecanja: podatak.ime_natjecanja,
        lightBg: podatak.lightBg,
        lightText: podatak.lightText,
        lightTextDesc: podatak.lightTextDesc,
        headline: podatak.headline,
        description: podatak.description,
        datum: podatak.datum,
        cat_pom: podatak.cat_pom,
        cat_hh: podatak.cat_hh
    })

    competition.save().then(result => {
        console.log("Podatak spremljen!")
        res.json(result)
    })
        .catch(err => next(err))
})

module.exports = competitionsRouter; 