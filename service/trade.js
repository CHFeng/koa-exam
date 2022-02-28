import moment from "moment";

import model from "../models/trade.js";

/**
 *  get the next trade date
 */
const getNextTradeDate = () => {
    return moment().add(1, "days");
}

/**
 *  create a trade order
 * @param {string} accoundId 
 * @param {string} fundId 
 */
const create = async (accoundId, fundId) => {
    const data = {status: false, msg: ""};

    if (!accoundId || !fundId) {
        data.msg = "It should have accoundId & fundId";
    } else {
        const today = moment().format("YYYY-MM-DD");
        const closingTime = moment(today + " 14:00:00");
        let realTradeDate;

        if (moment(tradeDate).isAfter(closingTime)) {
            data.msg = "It has passed closing time, the trade will be processed in next trade date";
            realTradeDate = getNextTradeDate();
        } else {
            data.msg = "craete trade order success";
            realTradeDate = moment();
        }
        await model.create(accoundId, fundId, false, realTradeDate);
        data.status = true;
    }

    return data;
}

/**
 *  update a trade order by id
 * @param {string} id 
 * @param {string} accoundId 
 * @param {string} fundId 
 * @param {boolean} isFinished 
 * @param {timestamp} tradeDate 
 * @param {number} transactionAmount 
 */
const update = async (id, accoundId, fundId, isFinished, tradeDate, transactionAmount) => {
    const data = {status: false, msg: ""};
    
    if (!id) {
        data.msg = "It should be have id to update";
    } else {
        const result = await model.getById(id);
        if (!!result) {
            await model.update(id, accoundId, fundId, isFinished, tradeDate, transactionAmount);
            data.status = true;
            data.msg = "update the trade success";
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