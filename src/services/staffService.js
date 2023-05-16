const connection = require('../config/database');
//const bcrypt = require('bcryptjs');

const User = function(user){
    this.userID = user.userID;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.password = user.password;
    this.truckID = user.truckID;
    this.companyID = user.companyID;
    this.isDeleted = user.isDeleted;
};
User.CreateNewUser = (newUser, result) => {
    connection.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { userID: res.insertId, ...newUser });
        result(null, { userID: res.insertId, ...newUser });
    });
};
User.UpdateById = (userID, user, result) => {
    connection.query(
        `UPDATE Users SET firstname = ?, lastname = ?, phone = ?, email = ?, password = ? WHERE userID = ?`,
        [user.firstname, user.lastname, user.phone, user.email,user.password ? false : true, userID],
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
User.Delete = (userID, result) => {
    connection.query("UPDATE Users SET isDeleted = ? WHERE userID = ?", [0, userID], (err, res) => {
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
        console.log("deleted user with userID: ", userID);
        result(null, res);
    });
};
User.findByEmail = (email, result) => {
    connection.query(`SELECT * from Users WHERE email = ? `,email, 
     (err, res) => {
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
User.findById = (userID, result) => {
    connection.query('SELECT * from Users WHERE userID = ?', userID, 
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
User.verify = (email, result) => {
    connection.query(
        "UPDATE Users SET email_verified_at = ? WHERE email = ?",
        [new Date(), email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { email: email });
        }
    );
};
User.ResetPassword = (email, password, result) => {
    connection.query(
        "UPDATE Users SET password = ? WHERE email = ?",
        [password, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { email: email });
        }
    );
};
User.getAll = result => {
     connection.query("SELECT userID, firstname, lastname, phone, email, role FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("User: ", res);
        result(null, res);
    });
};
module.exports = User;