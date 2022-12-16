const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//stores perfect pitch and interval user answers
const ProgressSchema = new Schema({
  sessions: {},
  answers: [],
});

const ProgressModel = mongoose.model("Progress", ProgressSchema);

module.exports = {
  ProgressModel,
  ProgressSchema: ProgressSchema
};