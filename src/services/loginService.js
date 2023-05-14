const connection = require('../config/database');
const bcrypt = require('bcryptjs');

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        const user = await findUserByEmail(email);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};

const findUserByEmail = (email)=>{
 return new Promise((resolve, reject) => {
     try{
         connection.query("SELECT * from Users where email = ?", email, function(error, rows) {
            if(error) reject(error);
            let user = rows[0];
            resolve(user);
         });
     }catch (e) {
         reject(e);
     }
 })
};

const compareUserPassword =  (user, password)=>{
    return new Promise(async (resolve, reject) => {
        try{
            let match = await bcrypt.compare(password, user.password);
            if(match) resolve(true);
            else resolve("The password that you've entered is incorrect")
        }catch (e) {
            reject(e);
        }
    })
};

const findUserById = (userID) => {
    return new Promise((resolve, reject) => {
        try{
            connection.query("SELECT * from Users where userID = ?", userID, function(error, rows) {
                if(error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        }catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    handleLogin,
    compareUserPassword,
    findUserByEmail,
    findUserById
};