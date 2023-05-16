const User = require('../services/staffService');
const bcrypt = require('bcryptjs');

const getLoginPage = (req, res) => {
    return res.render("login.ejs")
};
const getLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //getLogin
        User.findByEmail(email, (err, user) => {
            if (!user) {
                res.redirect('/');
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result == true) {
                    //    req.session.loggedin = true;
                    //    req.session.user = user;
                        res.redirect('/home');
                    } else {
                        // A user with that email address does not exists
                        const conflictError = 'User credentials are not valid.';
                        res.render('login', { email, password, conflictError });
                    }
                })
            }
        })
};
const getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.redirect('/home');
        res.redirect('/');
    })
};

module.exports = {
    getLoginPage,
    getLogin,
    getLogout
};