const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const staffController = require('../controllers/staffController');
const inventoryController = require('../controllers/inventoryController');
const truckController = require('../controllers/truckController');

// router.Method('/route', handle);
router.get('404', homeController.get404page);
router.get('/', authMiddleware.isAuth, loginController.getLoginPage);
router.post('/login',loginController.getLogin);

router.get('/home', authMiddleware.loggedin, homeController.getHomepage);

router.get('/logout', authMiddleware.isAuth, loginController.getLogout);
//Show all Staff
router.get('/staff', staffController.FindAllStaff);
//Create Staff
router.get('/addStaff', staffController.GetCreateStaff);
router.post('/create-staff', staffController.Register);
//Update Staff with userID
router.get('/editStaff/:userID', staffController.EditStaff)
router.post('/staff/:userID', staffController.UpdateStaff);
//Delete Staff with userID
router.get('/deleteStaff/:userID', staffController.DeleteStaff);

//Show all Inventory
router.get('/inventory', inventoryController.FindAllStockItem);
//Create StockItem
router.get('/addStockItem', inventoryController.GetCreateStockItem);
router.post('/createstockitem', inventoryController.CreateNew);
;
//Update StockItem with stockitemID
router.get('/editStockItem/:stockitemID', inventoryController.EditStockItem)
router.post('/:stockitemID', inventoryController.UpdateStockItem);
//Delete Staff with userID
router.get('/deleteStockItem/:stockitemID', inventoryController.DeleteStockItem);

//Show all Truck
router.get('/truck', truckController.FindAllTruck);
//Create Truck
router.get('/addTruck', truckController.GetCreateTruck);
router.post('/createtruck', truckController.CreateNew);
//Edit truck
router.get('/editTruck/:truckID',truckController.EditTruck);
//Delete Staff with userID
router.get('/deleteTruck/:truckID', truckController.DeleteTruck);

module.exports = router;