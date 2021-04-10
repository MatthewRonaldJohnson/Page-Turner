const checkAuth = function(req, res, next){
    // if(!req.session.userId) {
    //     res.redirect('/login')
    // } else {
    //     next();
    // }
    next();
}

module.exports = checkAuth;