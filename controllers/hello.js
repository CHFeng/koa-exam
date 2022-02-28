/**
 *  hellow world 
 * @param {object} ctx 
 */
const sayHello = async (ctx) => {
    ctx.body = {"msg": "Hello World"};
}

export default sayHello