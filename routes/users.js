const bcrypt = require('bcryptjs');
const router = require('express').Router();
let User = require('../models/user.model.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
        email = req.body.email
        const newUser = new User({
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        ntel : req.body.ntel,
        adr: req.body.adr,
        link:req.body.link,
        cin : req.body.cin,
        bdate : req.body.bdate, 
        fld : req.body.fld,
        univ : req.body.univ,
        room_type: req.body.room_type,
        room_mates:req.body.room_mates
    });
     /* simple validation */
     if (!email) {
      //status 400 stands for a bad request it means that the user didn't send the correct
      //info to get the correct response
      return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({
    email
  })
      .then(user => {
          // Checing if the user already registred
          if(user) return res.status(400).json({ msg: 'User already exists' })

          // Register new user
        newUser.save()
              .then(user => {
                  
                  let transporter = nodemailer.createTransport(smtpTransport({
                      service: 'gmail',
                      host: 'smtp.gmail.com',
                      auth: {
                          user: process.env.USER,
                          pass: process.env.PASS
                      },
                      tls: {
                          rejectUnauthorized: false
                      }
                 }));

                  // send mail with defined transport object
                  const mailOptions = {
                      from: process.env.USER, // sender address
                      to: `${email}`, // list of receivers
                      subject: "Artvalley Event | Creative Lab ISI ", // Subject line
                      text: "Registration done successfully  ", // plain text body
                  }
                  
                  transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                          console.log(error);
                      } else {
                          console.log('Email sent: ' + info.response);
                          res.status(200).json({ success: true })
                      }
                 });
                  
              })
              .catch(err => res.status(500).json({ msg: 'Error Occured while registering the user' }))

      })
      .catch(err => res.status(500).json({ msg: 'Error Occured While Fetching The Email' }))

  .catch(error => res.status(500).json({ error }));
});

module.exports = router;