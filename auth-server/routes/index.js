var express = require('express');
var router = express.Router();
const Access = require('../controllers/access')
const nodemailer = require("nodemailer");
var config = require('../config');
var CodeGenerator = require('node-code-generator');

var generator = new CodeGenerator();
var pattern = 'SSI*+';
var howMany = 100000;
var options = {};
var codes = generator.generateCodes(pattern, howMany, options);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'supermegasafe@gmail.com',
    pass: 'SuperMegaSafe'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authorization', { title: 'File System Authorization' });
});

router.get('/access', function(req, res, next) {
  Access.list()
    .then(d => res.status(200).jsonp(d) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/access', function(req, res, next) {


  req.body.code = codes[Math.floor(Math.random() * 10000)];
  var consult_code = codes[Math.floor(Math.random() * 10000)];
  req.body.authorized = false;
  
  var mailOptions = {
    from: 'supermegasafe@gmail.com',
    to: config.users.get(req.body.owner).email,
    subject: 'Authorization Required in Filesystem',
    text: 'The user ' + req.body.user + ' has requested access to ' + req.body.target + ' in order to ' + req.body.operation + '. If you wish to authorize this action use the following code: ' + req.body.code
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 

  Access.insert(req.body)
    .then(d => res.status(200).send(consult_code))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/access/:id', function(req, res, next) {
  Access.check(req.params.id)
    .then(d => res.status(200).send(d.authorized) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/authorize', function(req, res, next) {
  Access.authorize(req.body.code)
    .then(d => res.status(200).redirect('/'))
    .catch(e => res.status(500).jsonp({error: e}))
});




module.exports = router;