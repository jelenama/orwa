const mongoose = require('mongoose')

const supertest = require('supertest')

const app = require('../app')

const {Scores} = require('../models/competition')

const pomocni = require('./test_pomoc')


const api = supertest(app)



beforeEach( async () => {
 await Scores.deleteMany({})
 let objektScores= new Scores(pomocni.pocetniScores[0])
 await objektScores.save()
 objektScores = new Scores(pomocni.pocetniScores[1])
 await objektScores.save()

})


test('SCORES se vraćaju kao JSON', async () => {
    await api
      .get('/scores/bodovi')
      .expect(200)
      .expect('Content-Type', /application\/json/)


  })

  test('dohvaca SVE rezultate', async () => {
    const odgovor = await api.get('/scores/bodovi')
    expect(odgovor.body).toHaveLength(pomocni.pocetniScores.length)
   })
   
   test('dodavanje ispravnog rezultata', async () => {
    const noviScore = {
        id: 2,
        ime_tima: "Cheerleading club Lana",
        natjecanje_id: "62fee16e96ba81100ec9da02",
        datum: "2022-10-15T00:00:00.000+00:00",
        cat_pom_score: 70,
        cat_hh_score: 0,
        cat_style_execution: 7,
        mov_style_execution: 7,
        skill_tec_execution: 7,
        synchronization: 7,
        uniformity: 7,
        spacing: 7,
        musicality: 7,
        routine: 7,
        movement: 7,
        overall_effect: 7 
      
    }
    await api
    .post('/scores/newscore')
    .send(noviScore)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    
    const scoreNaKraju = await pomocni.scoresIzBaze()
    expect(scoreNaKraju).toHaveLength(pomocni.pocetniScores.length + 1)
    const natjecanje_id = scoreNaKraju.map(t => t.natjecanje_id) 

    expect(natjecanje_id).toContain('62fee16e96ba81100ec9da02')
   })


 test('dodavanje rezultata bez natjecanje_id', async () => {
    const noviScore = {
        id: 2,
        ime_tima: "Cheerleading club Lana",
        datum: "2022-10-15T00:00:00.000+00:00",
        cat_pom_score: 70,
        cat_hh_score: 0,
        cat_style_execution: 7,
        mov_style_execution: 7,
        skill_tec_execution: 7,
        synchronization: 7,
        uniformity: 7,
        spacing: 7,
        musicality: 7,
        routine: 7,
        movement: 7,
        overall_effect: 7 
      
    }
    await api
    .post('/scores/newscore')
    .send(noviScore)
    .expect(400)

    const scoreNaKraju = await pomocni.scoresIzBaze()
    expect(scoreNaKraju).toHaveLength(pomocni.pocetniScores.length)
    
   })
   
 
   test('dohvat specificnog rezultata', async () => {
    const scorePocetak = await pomocni.scoresIzBaze()

    const trazeniScore = scorePocetak[0]

    const odgovor = await api
    .get(`/scores/${trazeniScore.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const jsonPoruka = JSON.parse(JSON.stringify(trazeniScore))

    expect(odgovor.body).toEqual(jsonPoruka)
   })
   

afterAll(async () => {
 await mongoose.connection.close() 
})
