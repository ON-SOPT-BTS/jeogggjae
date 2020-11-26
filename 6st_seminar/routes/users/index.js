const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User, Post, Like } = require('../../models');
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/:id/delete', userController.deleteUser);
router.post('/:id/put', userController.put);
router.get('/', userController.readAll);
router.get('/:id', userController.readOne);
router.get('/profile', authUtils.checkToken, userController.getProfile);

module.exports = router;