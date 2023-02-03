const User = require('../models/user');


module.exports.registerForm =  (req, res) => {
    res.render('users/register')
}

module.exports.register = async(req, res, next) => {
    try {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        console.log(registeredUser)
        req.flash('success', 'Welcome to RuqThePlug!')
        res.redirect('/list')
    })
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.loginForm =  (req, res) => {
    res.render('users/login')
}

module.exports.login =  (req, res) => {
    req.flash('success', 'Welcome Back!')
    const redirectUrl = req.session.returnTo || '/list'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
    req.flash('success', 'Goodbye!, Hope to see you soon!')
    res.redirect('/list')
    })
}


