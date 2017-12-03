var express = require('express');
var router = express.Router();

var authenCheck = require('../modules/authenCheck');


router.use(authenCheck);

router.get('/', function(req, res) {
    res.render('./index/index');
});

module.exports = router;