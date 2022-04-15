/* */

class Mysql {
    getConnection(user) {
        var mysql = require('mysql');
       user ? {} : user = {}
        var connection = mysql.createConnection({
            host: user.host ? user.host : 'localhost', //链接地址
            user: user.user ? user.user : 'root', //用户名
            password: user.password ? user.password : '123456', //用户密码
            database: user.database ? user.database : 'test' //数据库
        })
        return connection
    }
    mysql(connection, opction) {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(opction.sql, [opction.para], function (error, results) { //第一个参数是需要执行的sql命令，第二个是执行后的回调函数第一个参数是执行失败的信息，成功为null。第二个参数包含了成功后的返回信息。
                if (opction.execute) {
                    opction.execute(error, results)
                    return
                }
                if (error) {
                    console.log('[UPDATE ERROR] - ', error.message);
                    return
                    reject()
                }
                if (results) {
                    resolve(results)
                }
                connection.end();
            });
        })
    }

}

module.exports=Mysql
// function test1(){
//     return arr=   mysql1(getConnection({}), {
//         sql: `select * from url where id >5930`,
//     })

// }
async function query(connection, opction) {
    let result = await mysql(getConnection({}), {
        sql: `select * from url where id >5930`,
    })
    console.log(result);
}