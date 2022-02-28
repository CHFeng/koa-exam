import model from "../models/fund.js";

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