const User = require('../services/staffService');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const GetEditStaff = (req, res) => {
    res.render('edit_staff');
};
const FindAllStaff = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.redirect('/')
        else res.render('tb-staff', {user: data});
    });
};
const GetCreateStaff = (req, res) => {
    res.render('add_staff');
};
const UpdateStaff = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/staff/' + '?status=error')
    }
    User.UpdateById(
        req.params.userID,
        new User(req.body),
        (err, data) => {
            res.redirect('/staff/' + '?status=success');
        }
    );
};

const EditStaff = (req, res) => {
    //res.locals.status = req.query.status;
    const userID = req.params.userID;
    User.findById(userID, (err, data) => {

    res.render('edit_staff', { user: data });
    });
};

const DeleteStaff = (req, res) => {
    User.Delete(req.params.userID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            }
        } else res.redirect('/staff')
    });
};
const Register = (req, res) => {
    const { firstname, lastname, email, phone, role, password} = req.body;

    if (firstname && lastname && email && phone && role && password) {
        User.findByEmail(email, (err, user) => {
            if (err || user) {
                // A user with that email address does not exists
                const conflictError = 'User credentials are exist.';
                res.render('add_staff', { firstname, lastname, email, phone, role, password, conflictError });
            }
        })
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
            // Create a User
            const user = new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                role: role,
                password: hashed
            });
            User.CreateNewUser(user, (err, user) => {
                if (!err) {
                    res.redirect('/staff');
                }
            })
        });
    } else {
        const conflictError = 'User credentials are exist.';
        res.render('add_staff', { firstname, lastname, email, phone, role, password, conflictError });
    }
}
module.exports = {
    FindAllStaff,
    GetEditStaff,
    GetCreateStaff,
    UpdateStaff,
    EditStaff,
    DeleteStaff,
    Register
};