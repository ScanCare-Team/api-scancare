const express = require('express');
const scanController = require('../controllers/scanController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/scan', authMiddleware, scanController.scanDocument);

module.exports = router;
