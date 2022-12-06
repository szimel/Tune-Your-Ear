const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/dev');


//sets time limit on afk users
function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
};

exports.signin = function(req, res, next) {
  res.send({
    token: tokenForUser(req.user)
  });
};

//search for user based on id
exports.currentUser = function(req, res) {
  User.findOne({_id: req.user._id}, function(err, user) {
    const User = {
      email: user.email,
      token: tokenForUser(user),
      id: req.user._id,
    };
    res.send(user);
  });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    console.log(req.body);
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email doesn't exist, create and save user record
    const user = new User();

    user.email = email;

    user.setPassword(password);

    user.save(function(err, user) {
      if (err) { return next(err); }
      console.log('worked');

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};