import fund from "../models/fund.js";
import service from "../service/fund.js";

const getAll = async (ctx) => {
    const result = await fund.getAll();

    ctx.body = {"data": result};
}

const getById = async (ctx) => {
    const id = ctx.params.id;

    const result = await fund.getById(id);
    ctx.body = {"data": result};
}

const create = async (ctx) => {
    const { name, type } = ctx.request.body;

    if (!name || !type) {
        ctx.status = 400;
        ctx.body = {msg: "It should be have name and type"}
    } else {
        const result = await fund.getByName(name);
        if (!result) {
            await fund.create(name, type);
            ctx.body = { msg: "craete fund success"};
        } else {
            ctx.status = 400;
            ctx.body = {msg: "The name should be different"}
        }
    }
}

const update = async (ctx) => {
    const { id, name, type, fee, nav } = ctx.request.body;
    const result = await service.update(id, name, type, fee, nav);

    if (!result.status) {
        ctx.status = 400;
    } 
    ctx.body = { msg: result.msg };
}

const buy = async (ctx) => {
    const { accoundId, fundId } = ctx.request.body;
    const result = await service.buy(accoundId, fundId);

    if (!result.status) {
        ctx.status = 400;
    } 

    ctx.body = { msg: result.msg };
}
export default {
    getAll: getAll, 
    getById: getById,
    create: create,
    update: update,
    buy: buy
};