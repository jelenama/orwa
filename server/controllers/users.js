const bcrypt =require('bcrypt')
const usersRouter =require('express').Router()
const User =require('../models/osoba.js')
const JWT = require('jsonwebtoken');
const passport = require('passport');
require('../passport');




const signToken = UserID => {
    return JWT.sign({
        iss : "kljuc",
        sub : UserID
    }, "kljuc",{expiresIn: "1h"})
}


usersRouter.get('/', async (req, res)=>{
    const users = await User.find({})
    res.json(users)
})



usersRouter.post('/register',(req,res)=>{
    const {email,username,role,password}=req.body;
    //postoji li user
    User.findOne({username},(err,user)=> {
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken.", msgError : true}});
        else {
            //stvori korisnika
            const newUser = new User({email,username,role,password});
            newUser.save(err => {
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created..", msgError : false}});
            })
        }
    });

});


usersRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id,username,email,role} =  req.user;
        const token = signToken(_id);
        res.cookie("jwt",token,{httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated : true,user : {username,email,role}})
    }
});

usersRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('jwt');
    
    return res.status(200).json({user:{username : "",email : "", role: ""}, success : true});
});

usersRouter.get('/admin',passport.authenticate('jwt', { session: false }),
function(req, res) {
    if(req.user.role === 'admin'){
        res.status(200).json({message:{msgBody:'ADMIN SI', msgError:false}});
    }
    else{
        res.status(403).json({message:{msgBody:'JUDGE SI', msgError:true}});
    }
}
);


usersRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,email,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, email,role}});
});


module.exports = usersRouter