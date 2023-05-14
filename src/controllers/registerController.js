const registerService = require ('../services/registerService');

const getRegisterPage = (req, res) => {
    return res.render('register.ejs', {
        errors: req.flash('errors')
    });
};

const createNewUser = async (req, res) => {
  try{
      let data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
      };
      //create a new user
      await registerService.createNewUser(data);
      return res.status(200).json({
          message: "a user create succeeds"
      })
  }catch (e) {
      return res.status(500).json(e);
  }
};
module.exports = {
    getRegisterPage,
    createNewUser
};