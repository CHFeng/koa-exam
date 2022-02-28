import { v4 as uuidv4 } from 'uuid';
import db from "../db/index.js"

/**
 *  insert a fund into table
 * @param {string} name 
 * @param {string} type 
 */
const create = async (name, type) => {
    const sql = `INSERT INTO ${db.fundTableName} (id, name, type) VALUES('${uuidv4()}', '${name}', '${type}')`;

    await db.query(sql);
}
/**
 *  updata a fund in table by id
 * @param {string} id 
 * @param {string} name 
 * @param {string} type 
 * @param {number} fee 
 * @param {number} nav 
 */
const update = async(id, name, type, fee, nav) => {
    const sql = `UPDATE ${db.fundTableName} SET name = '${name}', type = '${type}', fee = ${fee}, nav = ${nav} WHERE id = '${id}'`;
    await db.query(sql);
}
/**
 *  get a fund by id
 * @param {string} id 
 */
const getById = async(id) => {
    const sql = `SELECT * FROM ${db.fundTableName} WHERE id = '${id}'`;
    const res = await db.query(sql);

    return res.rows[0];
}
/**
 *  get a fund by name
 * @param {string} name 
 */
const getByName = async(name) => {
    const sql = `SELECT * FROM ${db.fundTableName} WHERE name = '${name}'`;
    const res = await db.query(sql);

    return res.rows[0];
}
/**
 *  get all funds
 */
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