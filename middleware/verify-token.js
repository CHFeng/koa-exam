import jwt from "jsonwebtoken";
import config from "../config.js"

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