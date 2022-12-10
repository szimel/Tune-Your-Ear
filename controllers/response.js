const User = require('../models/user');

//logs users answer history
exports.log = function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user) {
    console.log(req.body)
  });
}

