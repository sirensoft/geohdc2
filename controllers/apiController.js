var express = require('express');
var router = express.Router();
var tokenCheck = require('../components/tokenCheck');

router.use(tokenCheck);

router.get('/', (req, res) => {
    res.status(200).json({
        'result': 'ok'
    })
})

module.exports = router;