const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const {register, login, profile} = require('../controllers/authController');
router.post("/register", register);
router.post('/login', login);
router.get('/profile',authMiddleware, profile);
module.exports = router;