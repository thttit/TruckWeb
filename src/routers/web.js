const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const staffController = require('../controllers/staffController');
const addStaffController = require('../controllers/addStaffController');
//const inventoryController = require('../controllers/inventoryController');
//const initPassportLocal = require('../controllers/passportLocalController');

// router.Method('/route', handle);
router.get('/', homeController.getHomepage);
router.post('/logout', loginController.postLogOut);

router.get('/staff', staffController.getTbStaff);

router.get('/login', loginController.checkLoggedOut, loginController.getLoginPage);
router.post('/login',loginController.getLogin);

router.get('/addStaff', addStaffController.getAddStaff);
router.post('/staff', staffController.CreateNewStaff);

//router.get('/staff', staffController.getTbStaff);
//router.post('/staff', staffController.getAllStaff);

module.exports = router;