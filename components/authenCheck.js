var authenCheck = function(req, res, next) {
    if (req.session.username && req.cookies.username) {
        next();
    } else {
        res.redirect('/authen');
    }
}

module.exports = authenCheck;