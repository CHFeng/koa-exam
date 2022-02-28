import moment from "moment";

import fund from "../models/fund.js";
import trade from "../models/trade.js";

const create = async (name, type) => {
    const data = {status: false, msg: ""};

    if (!name || !type) {
        data.msg = "It should be have name and type";
    } else {
        const result = await fund.getByName(name);
        if (!result) {
            await fund.create(name, type);            
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
        const result = await fund.getById(id);
        if (!!result) {
            await fund.update(id, name, type, fee, nav);
            data.msg = "update the fund success";
        } else {
            data.msg = "The id does not exist";
        }
    }

    return data;
}

const getNextTradeDate = () => {
    return moment().add(1, "days");
}

const buy = async (accoundId, fundId) => {
    const data = {status: false, msg: ""};

    if (!accoundId || !fundId) {
        data.msg = "It should have accoundId & fundId";
    } else {
        const today = moment().format("YYYY-MM-DD");
        const closingTime = moment(today + " 14:00:00");
        let msg;
        let realTradeDate;

        data.status = true;
        if (moment(tradeDate).isAfter(closingTime)) {
            data.msg = "It has passed closing time, the trade will be processed in next trade date";
            realTradeDate = getNextTradeDate();
        } else {
            data.msg = "craete trade order success";
            realTradeDate = moment();
        }
        await trade.create(accoundId, fundId, false, realTradeDate);
    }

    return data;
}

export default {
    create: create,
    update: update,
    buy: buy
};