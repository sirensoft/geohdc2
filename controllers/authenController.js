var express = require('express')
var router = express.Router();

var jwt = require('jsonwebtoken')
var User = require('../models/User')
var mUser = new User();

var crypto = require('crypto')

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('username');
    res.redirect('/')
})

router.get('/', function(req, res) {
    res.render('./authen/index')
})

router.post('/', async function(req, res) {

    let username = req.body.username,
        password = req.body.password;
    let md5Password = crypto.createHash('md5').update(password).digest('hex');


    let logged = await mUser.login(username, md5Password);
    if (logged) {
        req.session.username = username;
        var token = await jwt.sign({ username: username, password: password }, 'secret', { expiresIn: '8h' })
        req.session.token = token;
        await mUser.lastlogin(username);
        res.redirect('/index');
    } else {
        res.redirect('/');
    }

})



module.exports = router