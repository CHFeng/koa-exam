import model from "../models/account.js";
import service from "../service/account.js"


const getAll = async (ctx) => {
    const result = await model.getAll();

    ctx.body = {data: result};
}

const getById = async (ctx) => {
    const result = await model.getById(ctx.user);

    ctx.body = {data: result};
}

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