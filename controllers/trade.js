import model from "../models/trade.js";
import service from "../service/trade.js";

/**
 *  get all of trade orders
 * @param {object} ctx 
 */
const getAll = async (ctx) => {
    const result = await model.getAll();

    ctx.body = {"data": result};
}
/**
 *  get a trade order by id
 * @param {object} ctx 
 */
const getById = async (ctx) => {
    const id = ctx.params.id;

    const result = await model.getById(id);
    ctx.body = {"data": result};
}
/**
 *  create a trade order
 * @param {object} ctx 
 */
const create = async (ctx) => {
    const { accoundId, fundId } = ctx.request.body;
    const result = await service.create(accoundId, fundId);

    if (!result.status) {
        ctx.status = 400;
    } 
    ctx.body = { msg: result.msg };
}
/**
 *  update trade order by id
 * @param {object} ctx 
 */
const update = async (ctx) => {
    const { id, accoundId, fundId, isFinished, tradeDate, transactionAmount } = ctx.request.body;
    const result = await service.update(id, accoundId, fundId, isFinished, tradeDate, transactionAmount);

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