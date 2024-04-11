// controllers/userController.js
const express = require('express');
const router = express.Router();



// 登录页面
router.get('/Contact', (req, res) => {

    res.render('contact'); // 使用EJS模板
  });
  


  module.exports = router;