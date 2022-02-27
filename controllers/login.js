const login = async (ctx) => {
    console.log(ctx.query)
    ctx.body = {"msg": "login"};
}

export default login