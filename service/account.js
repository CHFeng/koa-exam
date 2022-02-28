import pbkdf2 from "pbkdf2"
import jwt from "jsonwebtoken";

import account from "../models/account.js";
import config from "../config.js"

/**
 *  sing in an account
 * @param {string} id 
 * @param {string} password 
 */
const singin = async (id, password) => {
    const result = await account.getById(id);
    const data = {status: false, msg: ""};

    if (!result) {        
        data.msg = "The account does not exist";
    } else {
        const encrypted = pbkdf2.pbkdf2Sync(password, config.PBKDF2_SALT, 1, 32, 'sha512').toString();
        if (encrypted === result.password) {
            const token = jwt.sign(id, config.JWT_SECRET_KEY);
            data.status = true;
            data.msg = token;
        } else {
            data.msg = "The password is wrong";
        }
    }

    return data;
}
/**
 *  sing up an account
 * @param {string} id 
 * @param {string} password 
 * @param {string} secondPassword 
 */
const singup = async (id, password, secondPassword) => {
    const data = {status: false, msg: ""};

    if (!id || !password || !secondPassword) {
        data.msg = "It should be have id, password, secondPassword";
    } else {
        if (password !== secondPassword) {
            data.msg = "The password and secondPassword shoud be same";
        } else {
            const result = await account.getById(id);
            if (!result) {
                const encrypted = pbkdf2.pbkdf2Sync(password, config.PBKDF2_SALT, 1, 32, 'sha512');
                await account.create(id, encrypted);
                data.status = true;
                data.msg = "create account success";
            } else {
                data.msg = "This account has already existed";
            }
        }
    }

    return data;
}

export default {
    singin: singin,
    singup: singup
};