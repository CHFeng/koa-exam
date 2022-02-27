const sayHello = async (ctx) => {
    console.log(ctx.query)
    ctx.body = {"msg": "Hello World"};
}

export default sayHello