const {Competition} = require('../models/competition')
const Osoba = require('../models/osoba')


let pocetniCompetitions = [
    {
      id: 1,
      ime_natjecanja: "drzavno",
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    headline: "IDEMO NA NATJECANJE",
    description: "2 tima 2 kategorije",
    datum: "2022-09-01",
    cat_pom: "Cheerleading club Noa, Sedmi Vjetar",
    cat_hh: "Cheerleading club Noa, Sedmi Vjetar"
    },
    {
      id: 2,
      ime_natjecanja: "open",
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    headline: "IDEMO NA NATJECANJE",
    description: "2 tima 2 kategorije",
    datum: "2022-10-15",
    cat_pom: "Cheerleading club Noa, Sedmi Vjetar",
    cat_hh: "Cheerleading club Noa, Sedmi Vjetar"  
    }
  ] 

  const competitionsIzBaze = async () => {
      const competitions = await Competition.find({})
      return competitions.map(t => t.toJSON())
   }

   const nepostojeciId = async () => {
    const competitions = new Competition({ ime_natjecanja: "drzavno",
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    headline: "IDEMO NA NATJECANJE",
    description: "2 tima 2 kategorije",
    datum: "2022-09-01",
    cat_pom: "Cheerleading club Noa, Sedmi Vjetar",
    cat_hh: "Cheerleading club Noa, Sedmi Vjetar" });

    await competitions.save()
    await competitions.remove()
  
    return competitions._id.toString()
  }

  const korisniciUBazi = async () => {
    const korisnici = await Osoba.find({})
    return korisnici.map(k => k.toJSON())
  }



   module.exports = {
    pocetniCompetitions, competitionsIzBaze,nepostojeciId,korisniciUBazi
   }
   