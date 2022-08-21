const {Scores} = require('../models/competition')

let pocetniScores = [
    {
      id: 1,
      ime_tima: "Cheerleading club Noa",
      natjecanje_id: "62fee16e96ba81100ec9da02",
      datum: "2022-10-15T00:00:00.000+00:00",
      cat_pom_score: 90,
      cat_hh_score: 0,
      cat_style_execution: 9,
      mov_style_execution: 9,
      skill_tec_execution: 9,
      synchronization:9,
      uniformity: 9,
      spacing:9,
      musicality: 9,
      routine: 9,
      movement: 9,
      overall_effect: 9
    },
    {
      id: 2,
      ime_tima: "Sedmi Vjetar",
      natjecanje_id: "62fee16e96ba81100ec9da02",
      datum: "2022-10-15T00:00:00.000+00:00",
      cat_pom_score: 80,
      cat_hh_score: 0,
      cat_style_execution: 8,
      mov_style_execution: 8,
      skill_tec_execution: 8,
      synchronization: 8,
      uniformity: 8,
      spacing: 8,
      musicality: 8,
      routine: 8,
      movement: 8,
      overall_effect: 8 
    }
  ] 

  const scoresIzBaze = async () => {
      const scores = await Scores.find({})
      return scores.map(t => t.toJSON())
   }

   const nepostojeciId = async () => {
    const scores = new Scores({ ime_natjecanja: "drzavno",
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    headline: "IDEMO NA NATJECANJE",
    description: "2 tima 2 kategorije",
    datum: "2022-09-01",
    cat_pom: "Cheerleading club Noa, Sedmi Vjetar",
    cat_hh: "Cheerleading club Noa, Sedmi Vjetar" });

    await scores.save()
    await scores.remove()
  
    return scores._id.toString()
  }



 

   module.exports = {
    pocetniScores, scoresIzBaze,nepostojeciId
   }
   