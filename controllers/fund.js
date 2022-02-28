import model from "../models/fund.js";
import service from "../service/fund.js";

const getAll = async (ctx) => {
    const result = await model.getAll();

    ctx.body = {data: result};
}

const getById = async (ctx) => {
    const id = ctx.params.id;

    const result = await model.getById(id);
    ctx.body = {data: result};
}

const create = async (ctx) => {
    const { name, type } = ctx.request.body;

    if (!name || !type) {
        ctx.status = 400;
        ctx.body = {msg: "It should be have name and type"}
    } else {
        const result = await model.getByName(name);
        if (!result) {
            await model.create(name, type);
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

export default {
    getAll: getAll, 
    getById: getById,
    create: create,
    update: update,
};