import db from "../db/index.js"

/**
 *  insert an account into table
 * @param {string} id 
 * @param {string} password 
 */
const create = async (id, password) => {
    const sql = `INSERT INTO ${db.accountTableName} (id, password) VALUES('${id}', '${password}')`;
    await db.query(sql);
}
/**
 *  update an account in table by id 
 * @param {string} id 
 * @param {string} password 
 */
const update = async(id, password) => {
    const sql = `UPDATE ${db.accountTableName} SET password = '${password}' WHERE id = '${id}'`;
    await db.query(sql);
}
/**
 *  get an account by id
 * @param {string} id 
 */
const getById = async(id) => {
    const sql = `SELECT * FROM ${db.accountTableName} WHERE id = '${id}'`;
    const res = await db.query(sql);

    return res.rows[0];
}
/**
 *  get all accounts
 */
const getAll = async() => {
    const sql = `SELECT * FROM ${db.accountTableName}`;
    const res = await db.query(sql);

    return res.rows;
}
export default {
    create: create,
    update: update,
    getAll: getAll,
    getById: getById
};