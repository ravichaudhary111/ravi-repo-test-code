const express = require('express');
const multer = require('multer');
const userController = require('../controller/user.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/uploadFile',
    upload.single('file'),
    userController.uploadUserFile);


router.get('/getUser',
    userController.getUser)

module.exports = router;