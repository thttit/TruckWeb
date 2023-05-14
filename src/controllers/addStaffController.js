const connection = require('../config/database');

const getAddStaff = (req, res) => {
    res.render('add_staff.ejs');
};
module.exports={getAddStaff};