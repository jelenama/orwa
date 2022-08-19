const bcrypt = require('bcrypt')
const Osoba = require('../models/osoba')
const pomocni = require('./test_pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Kada imamo samo jednog korisnika u bazi', () =>{
  beforeEach(async () => {
    await Osoba.deleteMany({})
    const password ="majka"
    const passHash = await bcrypt.hash(password, 10)
    const korisnik = new Osoba({email: 'j5@gmail.com', username: 'jelka',role:'judge', password: passHash})
    await korisnik.save()
  })

  test('stvaranje novog korisnika', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi();

    const novi = {
        email: 'j7@gmail.com', username: 'jeremija',role:'admin',
      password: 'noa25'
    }

    await api
    .post('/user/register')
    .send(novi)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
  })


 


})

   test('ispravno vraca pogresku ako vec postoji username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()
    
    const novi = {
        email: 'j9@gmail.com', username: 'jeremija',role:'admin',
        password: 'noa325'
    }
  
    await api
    .post('/user/register')
    .send(novi)
    .expect(400)
    .expect('Content-Type', /application\/json/)
     
  
    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length)
  }) 
 

afterAll(() => {
    mongoose.connection.close()
  })