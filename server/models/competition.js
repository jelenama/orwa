const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  ime_natjecanja: {
    type: String,
    maxlength: 20,
    required: true
  },
  lightBg: {
    type: Boolean,
    required: true
  },
  lightText: {
    type: Boolean,
    required: true
  },
  lightTextDesc: {
    type: Boolean,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  datum: {
    type: Date,
    required: true
  },
  cat_pom: [String],
  cat_hh: [String]

})

competitionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

const scoresSchema = new mongoose.Schema({

  ime_tima: {
    type: String,
    required: true
  },
  natjecanje_id: {
    type: String,
    required: true
  },
  datum: {
    type: Date,
    required: true
  },
  cat_pom_score: {
    type: Number
  },
  cat_hh_score: {
    type: Number
  },
  cat_style_execution: {
    type: Number
  },
  mov_style_execution: {
    type: Number
  },
  skill_tec_execution: {
    type: Number
  },
  synchronization: {
    type: Number
  },
  uniformity: {
    type: Number
  },
  spacing: {
    type: Number
  },
  musicality: {
    type: Number
  },
  routine: {
    type: Number
  },
  movement: {
    type: Number
  },
  overall_effect: {
    type: Number
  }

})
scoresSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

const Competition = mongoose.model('Competition', competitionSchema, 'competitions');
const Scores = mongoose.model('Scores', scoresSchema, 'scores');

module.exports = { Competition, Scores };