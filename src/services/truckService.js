const connection = require('../config/database');
//const bcrypt = require('bcryptjs');

const Truck = function(truck){
    this.truckID = truck.truckID;
    this.model = truck.model;
    this.lincensePlate = truck.lincensePlate;
    this.userID = truck.userID;
    this.isDeleted = truck.isDeleted;
};
Truck.CreateNewTruck = (newTruck, result) => {
    connection.query("INSERT INTO Truck SET ?", newTruck, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created truck: ", { truckID: res.insertId, ...newTruck });
        result(null, { truckID: res.insertId, ...newTruck });
    });
};
Truck.UpdateById = (stockitemID, stockitem, result) => {
    connection.query(
        `UPDATE StockItem SET quantity = ? WHERE stockitemID = ?`,
        [stockitem.quantity ? false : true, stockitemID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } 
            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated user: ", { userID: userID, ...user });
            result(null, { userID: userID, ...user });
        }
    );
};
Truck.Delete = (truckID, result) => {
    connection.query("UPDATE Truck SET isDeleted = ? WHERE truckID = ?", [0, truckID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found todo with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};
Truck.findById = (truckID, result) => {
    connection.query('SELECT * from Truck WHERE truckID = ?', truckID, 
    function(err, res){ 
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0])
            return;
        }
        result(null, null);
    });
};
Truck.getAll = result => {
     connection.query('SELECT tr.truckID, tr.model, tr.lincensePlate, us.lastname from Truck tr inner join Users us on tr.userID=us.userID', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Truck: ", res);
        result(null, res);
    });
};
module.exports = Truck;