import model from "../models/account.js";
import service from "../service/account.js"

/**
 *  get all accounts
 * @param {object} ctx 
 */
const getAll = async (ctx) => {
    const result = await model.getAll();

    ctx.body = {data: result};
}
/**
 *  get an account by id
 * @param {object} ctx 
 */
const getById = async (ctx) => {
    const result = await model.getById(ctx.user);

    ctx.body = {data: result};
}
/**
 *  sing in account
 * @param {object} ctx 
 */
const singin = async (ctx) => {
    const { id, password } = ctx.request.body;
    const result = await service.singin(id, password);
    
    if (!result.status) {
        ctx.status = (result.msg.includes("password")) ? 401 : 400;
        ctx.body = {msg: result.msg};
    } else {
        ctx.body = {data: result.msg};
    }
}
/**
 *  sing up new account
 * @param {object} ctx 
 */
const singup = async (ctx) => {
    const { id, password, secondPassword } = ctx.request.body;
    const result = await service.singup(id, password, secondPassword);

    if (!result.status) {
        ctx.status = 400;
    }
    ctx.body = {msg: result.msg};
}

export default {
    getAll: getAll, 
    getById: getById,
    singin: singin ,
    singup: singup
};