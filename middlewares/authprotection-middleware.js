function authProtection(req , res,next){
    if(!res.locals.isAuth){
return res.redirect('/404')
    }
    next();
}

module.exports = authProtection;