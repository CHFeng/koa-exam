import fund from "../models/fund.js";

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

    if (!id) {
        ctx.status = 400;
        ctx.body = {msg: "It should be have id to update"}
    } else {
        const result = await fund.getById(id);
        if (!!result) {
            await fund.update(id, name, type, fee, nav);
            ctx.body = { msg: "update the fund success"};
        } else {
            ctx.status = 400;
            ctx.body = {msg: "The id does not exist"}
        }
    }
}

const buy = async (ctx) => {
    
}
export default {
    getAll: getAll, 
    getById: getById,
    create: create,
    update: update,
    buy: buy
};