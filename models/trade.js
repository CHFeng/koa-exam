import { v4 as uuidv4 } from 'uuid';
import db from "../db/index.js"

const create = async (accoundId, fundId, isFinished, tradeDate) => {
    const sql = `INSERT INTO ${db.tradeTableName} (id, accoundId, fundId, isFinished, tradeDate) 
        VALUES('${uuidv4()}', '${accoundId}', '${fundId}', ${isFinished}, ${tradeDate})`;

    await db.query(sql);
}

const update = async(id, accoundId, fundId, isFinished, tradeDate, transactionAmount) => {
    const sql = `UPDATE ${db.tradeTableName} SET 
        accoundId = '${accoundId}', fundId = '${fundId}', isFinished = ${isFinished}, tradeDate = ${tradeDate}, transactionAmount = ${transactionAmount}
         WHERE id = '${id}'`;
    await db.query(sql);
}

const getById = async(id) => {
    const sql = `SELECT * FROM ${db.tradeTableName} WHERE id = '${id}'`;
    const res = await db.query(sql);

    return res.rows[0];
}

const getAll = async() => {
    const sql = `SELECT * FROM ${db.tradeTableName}`;
    const res = await db.query(sql);

    return res.rows;
}
export default {
    create: create,
    update: update,
    getAll: getAll,
    getById: getById,
};