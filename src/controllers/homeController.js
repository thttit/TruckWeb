const connection = require('../config/database');
const staffService = require('../services/staffService');

const getHomepage = async(req, res) =>{
    //process data
    //call model 
    //const [results, fields] = await staffService.getUserByName(req.body.lastname);
    res.render('index.ejs', { user: req.user});
};
/*    connection.query(
        'select * from Users u',
        function (err, results, fields){
            console.log(">>>results= ", results);
        }
        const [results,fields] = await connection.query('select * from Users u');
    );*/
//    const [results,fields] = await connection.query('select * from Users u');

module.exports = {
    getHomepage
};