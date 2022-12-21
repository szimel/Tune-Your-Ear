const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//stores perfect pitch and interval user answers
const ProgressSchema = new Schema({
  session: {},
  answers: [],
  date: String
});

const ProgressModel = mongoose.model("Progress", ProgressSchema);

module.exports = {
  ProgressModel,
  ProgressSchema: ProgressSchema
};