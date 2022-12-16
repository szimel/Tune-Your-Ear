const passportService = require('./services/passport');
const passport = require('passport');
const Authentication = require('./controllers/authentication');
const Response = require('./controllers/progress');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
  app.get('/auth/current_user', requireAuth, Authentication.currentUser);
  app.post('/response', requireAuth, Response.log);
  app.post('/quiz', Response.difficulty);
};