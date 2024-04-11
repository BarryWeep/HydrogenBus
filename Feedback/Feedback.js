// controllers/userController.js
const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const moment = require('moment');




// 登录页面
router.get('/Feedback', (req, res) => {

    res.render('Feedback'); // 使用EJS模板
  });


  router.post('/QuestionairSubmit', (req, res) => {

    var FullName = req.body.FullName;
    var Email = req.body.email;
    var ExperienceOnthisBus = req.body.CustomerExperience;
    var InfluencedChoiceTrans = req.body.EcofriendlyAspect;
    var FeelSafeRiding = req.body.Safety;
    var OftenTraveling = req.body.OftenBusTravel;
    var whatMoreFrequent = req.body.FrequentZeroEmission;
    var Improvement = req.body.BusImproved;
    var recommenedfamily = req.body.RecommendToFriend;
    var otherfeedback = req.body.OtherFeedback;
    
    
    FullName = FullName.replace(/'/g, '%x1');
    FullName = FullName.replace(/"/g, '%x1');
    
    whatMoreFrequent = whatMoreFrequent.replace(/'/g, '%x1');
    whatMoreFrequent = whatMoreFrequent.replace(/"/g, '%x1');
    
    Improvement = Improvement.replace(/'/g, '%x1');
    Improvement = Improvement.replace(/"/g, '%x1');

    otherfeedback = otherfeedback.replace(/'/g, '%x1');
    otherfeedback = otherfeedback.replace(/"/g, '%x1');


    var allanswer = ExperienceOnthisBus +'|%|'+InfluencedChoiceTrans+'|%|'+FeelSafeRiding+'|%|'+OftenTraveling+'|%|'+whatMoreFrequent+'|%|'+Improvement+'|%|'+recommenedfamily+'|%|'+otherfeedback;

    console.log(allanswer);
    

    const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(formattedDate);

    const query = " INSERT INTO `feedbackanswer`( `Fullname`, `ContactEmail`, `ALLAnswers`, `SubmitTime`) VALUES ('"+FullName+"','"+Email+"','"+allanswer+"','"+formattedDate+"')";

    db.query(query, (err, results) => {

      if (err) {
        console.error(err.message);
        res.render('Feedback'); // 使用EJS模板
      } else {
        console.log('Data inserted successfully');
        res.render('UploadSuccessed'); // 使用EJS模板
      }
    });
  

    /*
    const params = new URLSearchParams({
        secret: '6LeZJTIpAAAAAINcj4h1EGpw6CyqPvDk_E1gFldy',
        response: req.body['g-recaptcha-response'],
        remoteip: req.ip,
    });

    fetch(' https://www.google.com/recaptcha/api/siteverify',{
         method: "POST",
         body: params,
      })
    .then(res =>res.json())
    .then(data => {
        if( data.success){
          res.json({captchaSuceess: true});
        }else{
          res.json({captchaSuceess: false});
        }
    })
    */
  

  });

  module.exports = router;