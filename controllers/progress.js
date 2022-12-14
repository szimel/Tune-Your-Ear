const User = require('../models/user');
const Progress = require('../models/progress');
const progressChord = require('../models/progress-chord');

//logs users answer history
exports.log = function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user) {
    //creates new progress model with data
    const progress = new Progress.ProgressModel({
      session: req.body.time,
      answers: req.body.results,
      date: req.body.date
    });
    progress.save(function (err, progress) {
      user.perfectPitch.push(progress);
      user.save(function (err, user) {
        res.send({
          user
        });
      });
    });
  });
};
exports.chord = function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user) {
    console.log('got here');
    const progress = new progressChord.ProgressChordModel({
      session: req.body.time,
      answers: req.body.results,
      date: req.body.date
    });
    progress.save(function (err, progress) {
      user.chordQuiz.push(progress);
      user.save(function (err, user) {
        res.send(user);
      });
    });
  });
};

//quiz difficulty 
exports.difficulty = function(req, res) {
  const difficulty = {};
  difficulty.data = req.body.e
  res.send(difficulty);
};

