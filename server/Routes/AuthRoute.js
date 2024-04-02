const express = require('express');
const { loginUser, registerUser, logoutUser } = require('../Controllers/AuthController');

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser);


module.exports = router;
