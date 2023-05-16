const Truck = require('../services/truckService');
require('dotenv').config();

const GetEditTruck = (req, res) => {
    res.render('edit_inventory');
};
const FindAllTruck = (req, res) => {
    Truck.getAll((err, data) => {
        if (err)
            res.redirect('/')
        else res.render('tb-truck', {truck: data});
    });
};
const GetCreateTruck = (req, res) => {
    res.render('add_inventory');
};
const UpdateTruck = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/inventory/' + '?status=error')
    }
    Truck.UpdateById(
        req.params.stockitemID,
        new User(req.body),
        (err, data) => {
            res.redirect('/inventory/' + '?status=success');
        }
    );
};

const EditTruck = (req, res) => {
    //res.locals.status = req.query.status;
    const stockitemID = req.params.stockitemID;
    Truck.findById(stockitemID, (err, data) => {

    res.render('edit_inventory', { stockitem: data });
    });
};

const DeleteTruck = (req, res) => {
    Truck.Delete(req.params.stockitemID, (err, data) => {
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
        Truck.findById(name, (err, user) => {
            if (err || user) {
                // A user with that email address does not exists
                const conflictError = 'Truck credentials are exist.';
                res.render('add_inventory', { name, quantity, conflictError });
            }
        })
            // Create a User
            const stockitem = new Truck({
                name: name,
                quantity: quantity,
            });
            Truck.CreateNewTruck(stockitem, (err, user) => {
                if (!err) {
                    res.redirect('/inventory');
                }
            })
    } else {
        const conflictError = 'Truck credentials are exist.';
        res.render('add_inventory', { name, quantity, conflictError });
    }
}
module.exports = {
    CreateNew,
    GetEditTruck,
    FindAllTruck,
    GetCreateTruck,
    UpdateTruck,
    EditTruck,
    DeleteTruck
};