const express = require("express");
const { getProfile, getUser, editProfile, editThemePreference, getAllUsers } = require("../Controllers/UserController");

const router = express.Router();

router.get('/profile', getProfile);
router.get('/profile/:id', getUser);
router.get('/', getAllUsers);
router.put('/editProfile/:id', editProfile);
router.put('/editThemePreference', editThemePreference);



module.exports = router;
