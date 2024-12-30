

const express = require('express');
const { createUser, getAllUser, login } = require('../controller/user.controller');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();


router.route('/').post(createUser).get(getAllUser)
router.route('/login').post(authenticateToken , login)


module.exports = router

