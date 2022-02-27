const getAllAccounts = async (ctx) => {
    console.log(ctx.query)
    ctx.body = {"msg": "getAllAccounts"};
}

export default getAllAccounts