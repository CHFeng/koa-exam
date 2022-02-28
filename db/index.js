import PG from 'pg'
import config from "../config.js"

const dbName = "koa";
const accountTableName = "accounts";
const fundTableName = "funds";
const tradeTableName = "trades";

const pool = new PG.Pool(config.database);

const query = async (text, params)  => {
    const result = await pool.query(text, params);
    return result;
}

const init = async () => {
    // install extension
    await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    let result = await query(`SELECT datname FROM pg_database where datname = '${dbName}'`);
    if (result.rowCount === 0) {
        await db.query(`CREATE DATABASE ${dbName}`);
        console.log(`CREATE DATABASE ${dbName} Success!`);
    }
    // check table are existed
    await query(`CREATE TABLE IF NOT EXISTS ${accountTableName} (
        id VARCHAR(20) NOT NULL,
        password VARCHAR(32) NOT NULL,
        balance Numeric DEFAULT 0.0,
        PRIMARY KEY (id))`
    );
    await query(`CREATE TABLE IF NOT EXISTS ${fundTableName} (
        id VARCHAR(36) NOT NULL,
        name VARCHAR(20) NOT NULL,
        type VARCHAR(5) NOT NULL,
        fee Numeric,
        nav Numeric,
        PRIMARY KEY (id))`
    );
    await query(`CREATE TABLE IF NOT EXISTS ${tradeTableName} (
        id VARCHAR(36) NOT NULL,
        accoundId VARCHAR(20) NOT NULL,
        fundId VARCHAR(36) NOT NULL,
        isFinished boolean NOT NULL,
        tradeDate timestamp NOT NULL,
        transactionAmount Numeric,
        PRIMARY KEY (id))`
    );
    // fetch tables
    result = await query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
    if (result.rowCount !== 3) {
        throw new Error("Create tables failed");
    } else {
        console.log("DB connect Success!")
    }
}

const findDataById = async (table, id) => {
    const  _sql =  "SELECT * FROM ?? WHERE id = ? ";
    return query( _sql, [ table, id ] );
}

const findAllData = async (table) => {
    const  _sql =  "SELECT * FROM ??";
    return query( _sql, [ table ] );
}

export default {
    accountTableName: accountTableName,
    fundTableName: fundTableName,
    tradeTableName: tradeTableName,
    query: query,
    init: init,
    findDataById: findDataById,
    findAllData: findAllData
};