const connection = require('../config/database');
const bcrypt =  require('bcryptjs');

const createNewInventory = (inventory) => {
    return new Promise(async (resolve, reject) => {
        try {
                //create a new user
                connection.query("INSERT INTO StockItem VALUES ? ", data, function(error, rows) {
                    if (error) reject(error);
                    resolve("create a new Stock Item successfully");
                })
        } catch (e) {
            reject(e);
        }
    });
};

const UpdateInventory = (name, quantity) => {
    return new Promise(async (resolve, reject) => {
        try {
                //create a new user
                connection.query("UPDATE StockItem(name, quantity) SET ? ", name, quantity, function(error, rows) {
                    if (error) reject(error);
                    resolve("create a new Stock Item successfully");
                })
        } catch (e) {
            reject(e);
        }
    });
};

const DeleteInventory = (stockitemID) => {
    return new Promise(async (resolve, reject) => {
        try {
                //create a new user
                connection.query("UPDATE StockItem SET isDeleted = b'0' WHERE stockitemID = ? ", stockitemID, function(error, rows) {
                    if (error) reject(error);
                    resolve("create a new Stock Item successfully");
                })
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createNewInventory,
    UpdateInventory,
    DeleteInventory
};