import jwt from "jsonwebtoken";
import account from "../models/account.js";
import config from "../config.js"

const getAll = async (ctx) => {
    const result = await account.getAll();

    ctx.body = {"data": result};
}

const getById = async (ctx) => {
    const result = await account.getById(ctx.user);

    ctx.body = {"data": result};
}

const singin = async (ctx) => {
    const { id, password } = ctx.request.body;
    const result = await account.getById(id);

    if (!result) {
        ctx.status = 400;
        ctx.body = {"msg": "The account does not exist"};
    } else {
        if (password === result.password) {
            const token = jwt.sign(id, config.JWT_SECRET_KEY);
    
            ctx.body = {"data": token};
        } else {
            ctx.status = 400;
            ctx.body = {"msg": "The password is wrong"};
        }
    }
        
}

const singup = async (ctx) => {
    const { id, password, secondPassword } = ctx.request.body;

    if (!id || !password || !secondPassword) {
        ctx.status = 400;
        ctx.body = {"msg" : "It should be have id, password, secondPassword"};
    } else {
        if (password !== secondPassword) {
            ctx.status = 400;
            ctx.body = {"msg" : "The password and secondPassword shoud be same"};
        } else {
            const result = await account.getById(id);
            if (!result) {
                await account.create(id, password);
                ctx.body = {"msg": "create account success"};
            } else {
                ctx.status = 400;
                ctx.body = {"msg" : "This account has already existed"};
            }
        }
    }
}

export default {
    getAll: getAll, 
    getById: getById,
    singin: singin ,
    singup: singup
};