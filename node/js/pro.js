const App = require("./nodelist")
const Mysql = require("./mysql")
let mysql = new Mysql()
let app = new App()



function getnum() {
    return parseInt(Math.random() * 1000000000)
}


// app.post("/login1", (data, req, resp) => {
//     console.log("data", data);
// })
app.post("/login", (data, req, resp) => {
    // setcookie(url, key, cookie, expires) 
    query()
    async function query() {
        let result = await mysql.mysql(mysql.getConnection({
           
        }), {
            sql: `select * from y_manager where username='${data.username}' and password = '${data.passwrold}'`,
        })
        if (result.length != 0) {
            let cookienum = getnum()
            console.log("cookie>>>", cookienum);
            await mysql.mysql(mysql.getConnection({
                
            }), {
                sql: `update y_manager set cookie=${cookienum} where username='${data.username}'`,
            })

            result[0].cookie = cookienum
            let cookie = {}
            for (let i in result[0]) {
                if (result[0].nick != result[0][i])
                    cookie[i] = result[0][i]
                if (result[0].cookie == result[0][i])
                    cookie[i] = cookienum
            }
            console.log("登录成功", cookie.cookie);
            app.setcookie("/login", "user", cookie)
            // console.log(app.getcookie(req.headers.cookie, "user"));
            resp.write(JSON.stringify(result[0]))
        }else{
            resp.write("密码错误")
        }
        resp.end()
    }
})
app.post('/adduser',(data,req,resp)=>{
    query()
    async function query() {
        cookie = JSON.parse(app.getcookie(req.headers.cookie, "user"))
        if (cookie) {
            let result = await mysql.mysql(mysql.getConnection({
               
            }), {
                sql: `select * from y_manager where cookie='${cookie.cookie}'`,
            })
            console.log("getcookie>>>", result);
            if (result.length != 0) {
                let prolist = await mysql.mysql(mysql.getConnection({
                 
                }), {
                    sql: `insert into  adduser (name,price,num,url) value ('${data.name}','${data.price}','${data.num}','${data.url}')`,
                })
                resp.write(JSON.stringify(prolist))
            } else {
                resp.write("cookie不正确")
            }
        } else {
            resp.write("未登录")
        }
        
    }
    resp.end()
   
    
})
app.get("/prolist", (data, req, resp) => {
    let cookie
    console.log("get");
    try {
        query()
        async function query() {
            cookie = JSON.parse(app.getcookie(req.headers.cookie, "user"))
            console.log(cookie);
            if (cookie) {
                let result = await mysql.mysql(mysql.getConnection({
                   
                }), {
                    sql: `select * from y_manager where cookie='${cookie.cookie}'`,
                })
                console.log("getcookie>>>", result);
                if (result.length != 0) {
                    let prolist = await mysql.mysql(mysql.getConnection({
                      
                    }), {
                        sql: `select * from adduser`,
                    })
                    resp.write(JSON.stringify(prolist))
                } else {
                    resp.write("cookie不正确")
                }
            } else {
                resp.write("未登录")
            }
            resp.end()
        }
    } catch (error) {
        cookie = null
        console.log("cookie>>>" + error);
        resp.end()
    }

})
app.run(8090)