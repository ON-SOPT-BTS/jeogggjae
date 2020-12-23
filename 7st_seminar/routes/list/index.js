const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../../modules/multer');
const listController = require('../../controller/listcontroller');


router.get('/', listController.get);

module.exports = router;
