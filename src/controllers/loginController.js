const {validationResult} = require('express-validator');
const connection = require('../config/database');
const loginService = require('../services/loginService');

const getLoginPage = (req, res) => {
  return res.render("login.ejs")
};
const getLogin = (req, res) => {
    let email= req.body.email;
        let pass= req.body.password;
        let user=[[email,pass]];
        connection.getConnection(function(err,tempCont){
        if(!!err){
        tempCont.release();
        console.log('Error while connecting database');
      }else{
          console.log('Connected to database');
           let sql='SELECT email, password FROM Users;'
            tempCont.query(sql,function(err, result, fields){
          if(!!err){
            tempCont.release();
            console.log('invalid query');
          }else {
            console.log('Valid query');
            console.log('The solutions is'+result);
            console.log(result.password);
            res.redirect('/');
        }
    });   
  }
 });
   
};
const handleLogin = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.email, req.body.password);
        return res.redirect("/");
    } catch (err) {
        return res.redirect("/login");
    }
};

const checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }
    next();
};

const checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
};

const postLogOut = (req, res) =>{
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

module.exports = {
    getLoginPage,
    getLogin,
    handleLogin,
    checkLoggedIn,
    checkLoggedOut,
    postLogOut
};