// controllers/userController.js
const express = require('express');
const router = express.Router();



// 登录页面
router.get('/HydrogenBusProfile', (req, res) => {

    res.render('HydrogenBus'); // 使用EJS模板
  });
  


  module.exports = router;