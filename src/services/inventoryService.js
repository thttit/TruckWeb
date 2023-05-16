const connection = require('../config/database');

const StockItem = function(stockitem){
    this.stockitemID = stockitem.stockitemID;
    this.name = stockitem.name;
    this.quantity = stockitem.quantity;
    this.companyID = stockitem.companyID;
    this.isDeleted = stockitem.isDeleted;
};
StockItem.CreateNewStockItem = (newStockitem, result) => {
    connection.query("INSERT INTO StockItem SET ?", newStockitem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created stockitem: ", { stockitemID: res.insertId, ...newStockitem });
        result(null, { stockitemID: res.insertId, ...newStockitem });
    });
};
StockItem.UpdateById = (stockitemID, stockitem, result) => {
    connection.query(
        `UPDATE StockItem SET quantity = ? WHERE stockitemID = ?`,
        [stockitem.quantity ? false : true, stockitemID],
        (err, res) => {
            console.log("res: ", res);
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
            console.log("updated user: ", { stockitemID: stockitemID, ...user });
            result(null, { stockitemID: stockitemID, ...user });
        }
    );
};
StockItem.Delete = (stockitemID, result) => {
    connection.query("UPDATE StockItem SET isDeleted = ? WHERE stockitemID = ?", [0, stockitemID], (err, res) => {
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
        console.log("deleted stockitem with stockitemID: ", stockitemID);
        result(null, res);
    });
};
StockItem.findById = (stockitemID, result) => {
    connection.query('SELECT * from StockItem WHERE stockitemID = ?', stockitemID, 
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
StockItem.getAll = result => {
     connection.query("SELECT stockitemID, name, quantity FROM StockItem", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("StockItem: ", res);
        result(null, res);
    });
};
module.exports = StockItem;