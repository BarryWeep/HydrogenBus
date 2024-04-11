// controllers/userController.js
const express = require('express');
const router = express.Router();



// 登录页面
router.get('/Service', (req, res) => {

    res.render('services'); // 使用EJS模板
  });
  


  module.exports = router;