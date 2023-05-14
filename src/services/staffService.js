const connection = require('../config/database');
const bcrypt = require('bcryptjs');

const getAllUser = async () => {
    let [results, fields] = await connection.query('SELECT userID, firstname, lastname, phone, email, role FROM Users');
    return results;
};
const getCurrentCompanyIdByUser = (companyID) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT companyID from Users where companyID = ?", companyID, function (error, rows) {
                if (error) reject(error);
                if (rows.length > 0) resolve(true);
                resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });
};
const CreateNewStaff = async(user) => {

    const check = await getEmailUser(user.email);
    const companyid = await getCompanyIdByUser(user.companyID);
    if (check) {
        res.send(`This email "${user.email}" has already exist. Please choose an other email`);
    } else{
        //hash user's password
        const salt = bcrypt.genSaltSync(10);

        let firstname = user.firstname;
        let lastname = user.lastname;
        let email = user.email;
        let phone = user.phone;
        let role = user.role;
        let password = bcrypt.hashSync(user.password, salt);
        let companyID = user.companyID;

        
        //create a new user (truyền động)
        connection.query(`INSERT INTO Users(firstname, lastname, email, phone, role, password) 
                VALUES (?,?,?,?,?,?)`, [firstname, lastname, email, phone, role, password], function (err, results) {
            console.log(results);
        });
    }
};

const getUserById = (userID) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from Users where userID = ?", userID, function (error, rows) {
                if (error) reject(error);
                if (rows.length > 0) resolve(true);
                resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });
};

const getUserByName = (lastname) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from Users where lastname = ?", lastname, function (error, rows) {
                if (error) reject(error);
                if (rows.length > 0) resolve(true);
                resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });
};

const getEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from Users where email = ?", email, function (error, rows) {
                if (error) reject(error);
                if (rows.length > 0) resolve(true);
                resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllUser,
    getCurrentCompanyIdByUser,
    CreateNewStaff,
    getUserById,
    getUserByName,
    getEmailUser
};