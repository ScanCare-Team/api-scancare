const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.put('/user/profile', authController.updateProfile);

router.get('/user/:email', authController.getUserData);

module.exports = router;
