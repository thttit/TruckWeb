const Truck = require('../services/truckService');
require('dotenv').config();

const GetEditTruck = (req, res) => {
    res.render('edit_trucks');
};
const FindAllTruck = (req, res) => {
    Truck.getAll((err, data) => {
        if (err)
            res.redirect('/')
        else res.render('tb-truck', {truck: data});
    });
};
const GetCreateTruck = (req, res) => {
    res.render('add_truck');
};
const UpdateTruck = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/truck');
    }
    Truck.UpdateById(
        req.params.truckID,
        Truck(req.body),
        (err, data) => {
            res.redirect('/truck');
        }
    );
};

const EditTruck = (req, res) => {
    //res.locals.status = req.query.status;
    const truckID = req.params.truckID;
    Truck.findById(truckID, (err, data) => {

    res.render('edit_trucks', { truck: data });
    });
};

const DeleteTruck = (req, res) => {
    Truck.Delete(req.params.truckID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            }
        } else res.redirect('/truck')
    });
};
const CreateNew = (req, res) => {
    const { model, lincensePlate, userID} = req.body;
    if (model && lincensePlate && userID) {
        console.log(">>>>>")
            // Create a User
            const truck = new Truck({
                truckID:parseInt(uuidv4()),
                model: model,
                lincensePlate: lincensePlate,
                userID: userID
            });
            Truck.CreateNewTruck(truck, (err, user) => {
                if (!err) {
                    res.redirect('/truck');
                }
            })
    } else {
        res.render('add_truck', { model, lincensePlate, userID });
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