const mongoose = require('mongoose')

const supertest = require('supertest')

const app = require('../app')

const {Competition} = require('../models/competition')

const pomocni = require('./test_pomocni')


const api = supertest(app)



beforeEach( async () => {
 await Competition.deleteMany({})
 let objektCompetition = new Competition(pomocni.pocetniCompetitions[0])
 await objektCompetition.save()
 objektCompetition = new Competition(pomocni.pocetniCompetitions[1])
 await objektCompetition.save()

})


test('NATJECANJA se vraćaju kao JSON', async () => {
    await api
      .get('/competitions/events')
      .expect(200)
      .expect('Content-Type', /application\/json/)


  })

  test('dohvaca SVA natjecanja', async () => {
    const odgovor = await api.get('/competitions/events')
    expect(odgovor.body).toHaveLength(pomocni.pocetniCompetitions.length)
   })
   
   test('dodavanje ispravnog natjecanja', async () => {
    const noviEvent = {
      ime_natjecanja: "drzavno",
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    headline: "IDEMO NA NATJECANJE",
    description: "2 tima 2 kategorije",
    datum: Date('14.12.2021'),
    cat_pom: "Cheerleading club Noa, Sedmi Vjetar",
    cat_hh: "Cheerleading club Noa, Sedmi Vjetar"
      
    }
    await api
    .post('/competitions/newevent')
    .send(noviEvent)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    
    const compsNaKraju = await pomocni.competitionsIzBaze()
    expect(compsNaKraju).toHaveLength(pomocni.pocetniCompetitions.length + 1)
    const opis = compsNaKraju.map(t => t.description) 

    expect(opis).toContain('2 tima 2 kategorije')
   })


 test('dodavanje eventa bez datuma', async () => {
    const noviEvent = {
      ime_natjecanja: "adriatic",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    headline: "IDEMO NA NATJECANJE",
    description: "2 tima 2 kategorije",
    cat_pom: "Cheerleading club Noa, Sedmi Vjetar",
    cat_hh: "Cheerleading club Noa, Sedmi Vjetar"
    }
    await api
    .post('/competitions/newevent')
    .send(noviEvent)
    .expect(400)

    const compsNaKraju = await pomocni.competitionsIzBaze()
    expect(compsNaKraju).toHaveLength(pomocni.pocetniCompetitions.length)
   })
   
 
   test('dohvat specificnog natjecanja', async () => {
    const compsPocetak = await pomocni.competitionsIzBaze()

    const trazeniEvent = compsPocetak[0]

    const odgovor = await api
    .get(`/competitions/${trazeniEvent.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const jsonPoruka = JSON.parse(JSON.stringify(trazeniEvent.ime_natjecanja))

    expect(odgovor.body).toEqual(jsonPoruka)
   })
   

   test('ispravno brisanje natjecanja', async () => {

    const compsPocetak = await pomocni.competitionsIzBaze()

    const trazeniEventBrisanje = compsPocetak[0]

    const odgovor = await api
    .delete(`/competitions/${trazeniEventBrisanje.id}`)
    .expect(204)

    const compsNaKraju = await pomocni.competitionsIzBaze()
    expect(compsNaKraju).toHaveLength(pomocni.pocetniCompetitions.length-1)


    const datum = compsNaKraju.map(t => t.datum)
    expect(datum).not.toContain(trazeniEventBrisanje.datum)
   }) 
   

afterAll(async () => {
 await mongoose.connection.close() 
})
