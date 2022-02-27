const getAllFunds = async (ctx) => {
    console.log(ctx.query)
    ctx.body = {"msg": "getAllFunds"};
}

export default getAllFunds