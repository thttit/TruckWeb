const connection = require('../config/database');

const getTbTruck = (req, res) =>{
    res.render('tb-truck.ejs')
};
module.exports ={
    getTbTruck
};