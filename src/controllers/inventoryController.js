const connection = require('../config/database');

const getTbInventory = (req, res) =>{
    res.render('tb-inventory.ejs')
};
const createNewInventory = async (req, res) => {
    try{
        let data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        //create a new user
        await registerService.createNewInventory(data);
        return res.status(200).json({
            message: "a user create succeeds"
        })
    }catch (e) {
        return res.status(500).json(e);
    }
  };
module.exports ={
    getTbInventory,
    createNewInventory
};