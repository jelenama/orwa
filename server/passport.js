const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/osoba');


var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};




//middleware za autorizaciju
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "kljuc"
}, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
 



//autentikacija email i password, samo za login
passport.use('local',new LocalStrategy((username,password,done)=>{
    User.findOne({username},(err,user)=>{
        //neka greska sa bazom
        if(err)
            return done(err);
        // nema usera
        if(!user)
            return done(null,false);
        //provjera jel password tocan
        user.comparePassword(password,done);
    });
}));

