const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//stores perfect pitch and interval user answers
const ProgressChordSchema = new Schema({
  session: {},
  answers: [],
  date: String
});

const ProgressChordModel = mongoose.model("ProgressChord", ProgressChordSchema);

module.exports = {
  ProgressChordModel,
  ProgressChordSchema: ProgressChordSchema
};