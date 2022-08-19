const scoresRouter = require('express').Router();

const { Scores } = require('../models/competition');

scoresRouter.get('/bodovi', (req, res) => {
    Scores.find({}).then(rezultat => {
        res.json(rezultat)
    })
})

scoresRouter.get('/:id', (req, res, next) => {
    Scores.findById(req.params.id)
        .then(scores => {
            if (scores) {
                res.json(scores)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))

})

scoresRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Scores.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))

})


scoresRouter.post('/newscore', (req, res, next) => {
    const podatak = req.body
    const scores = new Scores({
        ime_tima: podatak.ime_tima,
        natjecanje_id: podatak.natjecanje_id,
        datum: podatak.datum,
        cat_pom_score: podatak.cat_pom_score,
        cat_hh_score: podatak.cat_hh_score,
        cat_style_execution: podatak.cat_style_execution,
        mov_style_execution: podatak.mov_style_execution,
        skill_tec_execution: podatak.skill_tec_execution,
        synchronization: podatak.synchronization,
        uniformity: podatak.uniformity,
        spacing: podatak.spacing,
        musicality: podatak.musicality,
        routine: podatak.routine,
        movement: podatak.movement,
        overall_effect: podatak.overall_effect

    })

    scores.save().then(result => {
        console.log("Podatak spremljen!")
        res.json(result)
    })
        .catch(err => next(err))
})

module.exports = scoresRouter; 