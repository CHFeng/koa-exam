import jwt from "jsonwebtoken";
import config from "../config.js"

/**
 *  verify token in header
 * @param {object} ctx 
 * @param {function} next 
 */
const verifyToken = async (ctx, next) => {
    const { token } = ctx.header;
    
    if (!token) {
        ctx.status = 401;
        ctx.body = { msg: "It should be authenticated"}
    } else {
        const payload = await jwt.verify(token, config.JWT_SECRET_KEY);        
        ctx.user = payload;
        await next();
    }
}

export default verifyToken;