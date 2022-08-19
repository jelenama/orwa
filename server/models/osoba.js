const mongoose = require('mongoose');

const bcrypt =require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
    },
    username:{
        type:String,
        unique:true
    },
    role: {
        type : String,
        enum:['judge','admin'],
        required : true        
    },
    password:{
        type : String,
        required : true
    }

})

//mongoose middleware
userSchema.pre('save',function(next){
    if (!this.isModified('password')) 
        return next(); //gledamo jeli se pass vec hasha,, tj tribali ga hashat, kod novih usera ili kad minjamo lozinku
    

    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if (err)
            return next(err)
        this.password=passwordHash;
        next();
    });
});

userSchema.methods.comparePassword= function(password,cb){
    bcrypt.compare(password, this.password,(err, isMatch)=>{
        if(err)
            return cb(err);
        else{
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this); //this=> user
        }
    });
}






module.exports= mongoose.model('Osoba',userSchema,'osobe');;
