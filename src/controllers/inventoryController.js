const StockItem = require('../services/inventoryService');
const {v4:uuidv4} = require('uuid')
require('dotenv').config();

const GetEditStockItem = (req, res) => {
    res.render('edit_inventory');
};
const FindAllStockItem = (req, res) => {
    StockItem.getAll((err, data) => {
        if (err)
            res.redirect('/')
        else res.render('tb-inventory', {stockitem: data});
    });
};
const GetCreateStockItem = (req, res) => {
    res.render('add_inventory');
};
const UpdateStockItem = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/inventory')
    }
    StockItem.UpdateById(
        req.params.stockitemID,
        StockItem(req.body),
        (err, data) => {
            res.redirect('/inventory');
        }
    );
};

const EditStockItem = (req, res) => {
    //res.locals.status = req.query.status;
    const stockitemID = req.params.stockitemID;
    StockItem.findById(stockitemID, (err, data) => {

    res.render('edit_inventory', { stockitem: data });
    });
};

const DeleteStockItem = (req, res) => {
    StockItem.Delete(req.params.stockitemID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            }
        } else res.redirect('/inventory')
    });
};
const CreateNew = (req, res) => {
    const { name, quantity} = req.body;
    if (name && quantity) {
        console.log(">>>>>")
            // Create a User
            const stockitem = new StockItem({
                stockitemID:parseInt(uuidv4()),
                name: name,
                quantity: quantity,
            });
            StockItem.CreateNewStockItem(stockitem, (err, user) => {
                if (!err) {
                    res.redirect('/inventory');
                }
            })
    } else {
        const conflictError = 'StockItem credentials are exist.';
        res.render('add_inventory', { name, quantity, conflictError });
    }
}
module.exports = {
    CreateNew,
    GetEditStockItem,
    FindAllStockItem,
    GetCreateStockItem,
    UpdateStockItem,
    EditStockItem,
    DeleteStockItem
};