const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = require('./../Models/User');

exports.googleAuth = function (passport) {
    //get the user profile 
  passport.use( new GoogleStrategy({
      clientID : process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
  }, 
  //save it to the database..
  async (accessToken, refreshToken, profile, done) =>{
    //console.log(profile)
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
    }
    try{
        //if user already exist.
        let user = await User.findOne( { googleId: profile.id});
        if(user){
            done(null, user)
        }else{
            user = await User.create(newUser);
            done(null, user)
        }
    }catch(err){
        console.log(err)
    }
  }))
  passport.serializeUser((user, done)=> {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });  
}