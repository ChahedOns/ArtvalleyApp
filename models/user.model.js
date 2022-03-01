


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    /*id,name,email,Ntel,adr,link,CIN,bdate,field,univ,pwd,cpwd*/
id: {type: Number,required: true,unique: true,trim: true},
name : {type: String,required: true,trim: true,minlength: 3},
email: {type: String,required: true,unique: true,trim: true,minlength: 15},
ntel: {type: String,required: true,trim: true,length: 8},
adr: {type: String ,required: true,trim: true,minlength: 4},
link: {type: String,required: true,trim: true,minlength: 10},
cin: {type: String,required: true,trim: true,length:8},
bdate: {type: Date,required: true},
fld: {type: String,required: true},
univ: {type: String,required: true},
room_type : {type: String, required: true },
room_mates : {type : Array}

}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;