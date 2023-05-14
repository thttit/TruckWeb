const connection = require('../config/database');
const {getAllUser, createNewStaff} = require('../services/staffService');

const getTbStaff = async(req, res) =>{
    let results = await getAllUser();
    res.render('tb-staff.ejs', { listStaff: results})
};
const CreateNewStaff = async (req, res) => {
    try{
        let data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            password: req.body.password
        };
        //create a new user
        await staffService.CreateNewStaff(data);
        return res.status(200).json({
            message: "a user create succeeds"
        })
    }catch (e) {
        return res.status(500).json(e);
    }
  };
module.exports = {
    getTbStaff,
    CreateNewStaff
};