const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config/database");

// module.exports = function(passport) {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deSerializeUser((id, done) => {
//     user.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });

//   passport.use(
//     "local-signup",
//     new LocalStrategy({
//       username: ""
//     })
//   );
// };

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.getUserById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
