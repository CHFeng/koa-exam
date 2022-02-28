import model from "../models/fund.js";

/**
 *  create a fund
 * @param {string} name 
 * @param {string} type 
 */
const create = async (name, type) => {
    const data = {status: false, msg: ""};

    if (!name || !type) {
        data.msg = "It should be have name and type";
    } else {
        const result = await model.getByName(name);
        if (!result) {
            await model.create(name, type);            
            data.status = true;
            data.msg = "craete fund success";
        } else {
            data.msg = "The name should be different";
        }
    }

    return data;
}

/**
 *  update a fund by id
 * @param {string} id 
 * @param {string} name 
 * @param {string} type 
 * @param {number} fee 
 * @param {number} nav 
 */
const update = async (id, name, type, fee, nav) => {
    const data = {status: false, msg: ""};
    
    if (!id) {
        data.msg = "It should be have id to update";
    } else {
        const result = await model.getById(id);
        if (!!result) {
            await model.update(id, name, type, fee, nav);
            data.msg = "update the fund success";
        } else {
            data.msg = "The id does not exist";
        }
    }

    return data;
}

export default {
    create: create,
    update: update,
};