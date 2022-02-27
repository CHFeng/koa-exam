import { v4 as uuidv4 } from 'uuid';
import db from "../db/index.js"

const create = async (name, type) => {
    const sql = `INSERT INTO ${db.fundTableName} (id, name, type) VALUES('${uuidv4()}', '${name}', '${type}')`;

    await db.query(sql);
}

const update = async(id, name, type, fee, nav) => {
    const sql = `UPDATE ${db.fundTableName} SET name = '${name}', type = '${type}', fee = ${fee}, nav = ${nav} WHERE id = '${id}'`;
    await db.query(sql);
}

const getById = async(id) => {
    const sql = `SELECT * FROM ${db.fundTableName} WHERE id = '${id}'`;
    const res = await db.query(sql);

    return res.rows[0];
}

const getByName = async(name) => {
    const sql = `SELECT * FROM ${db.fundTableName} WHERE name = '${name}'`;
    const res = await db.query(sql);

    return res.rows[0];
}

const getAll = async() => {
    const sql = `SELECT * FROM ${db.fundTableName}`;
    const res = await db.query(sql);

    return res.rows;
}
export default {
    create: create,
    update: update,
    getAll: getAll,
    getById: getById,
    getByName: getByName
};