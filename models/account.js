import db from "../db/index.js"

const create = async (id, password) => {
    const sql = `INSERT INTO ${db.accountTableName} (id, password) VALUES('${id}', '${password}')`;
    await db.query(sql);
}

const update = async(id, password) => {
    const sql = `UPDATE ${db.accountTableName} SET password = '${password}' WHERE id = '${id}'`;
    await db.query(sql);
}

const getById = async(id) => {
    const sql = `SELECT * FROM ${db.accountTableName} WHERE id = '${id}'`;
    const res = await db.query(sql);

    return res.rows[0];
}

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