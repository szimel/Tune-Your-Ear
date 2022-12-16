const User = require('../models/user');
const Progress = require('../models/progress')

//logs users answer history
exports.log = function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user) {
    console.log('worked')
    console.log(req.body)
    // const progress = new Progress.ProgressModel({

    // })

    // user.perfectPitchAnswers.push(req.body)
    // console.log(user.perfectPitchAnswers);
    // user.save();
    // res.end();
  });
};

//quiz difficulty 
exports.difficulty = function(req, res) {
  const difficulty = {};
  difficulty.data = req.body.e
  res.send(difficulty);
  
};

