const User = require('../services/staffService');

const getHomepage = (req, res) =>{
    //process data
    //call model 
    User.getAll((err, data) => {
        if (err)
            res.redirect('/')
        else res.render('index.ejs', {user: data});
    });
};
const get404page = (req, res) => {
    res.render('404.ejs');
};
module.exports = {
    getHomepage,
    get404page
};