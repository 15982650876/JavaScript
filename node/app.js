const mysql=require('mysql')
let con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'myprolistdb'

})
con.connect()
let sql='SELECT * FROM prolsit'
con.query(sql,function(err,date){
    if(err){
        console.log('出错')
    }
    console.log(date)
})


const http=require('http')
let server=http.createServer(function(require,resp){
        let url=require.url
        var productList = [
            {
            id: 1001, //商品序号
            name: 'js高级编程', //商品名
            url:
            'https://img1.baidu.com/it/u=454394458,1998378568&fm=253&fmt=auto&app=138&f=JPEG', //商品图
            price: 68.90, //商品价格
            num: 0, //商品数量
            singlePrice: 0, //商品总价=数量*价格
            },
            {
            id: 1002,
            name: 'css高级编程',
            url: 'https://img1.baidu.com/it/u=337910016,91561566&fm=26&fmt=auto',
            price: 55.89,
            num: 0,
            singlePrice: 0,
            },
            {
            id: 1003,
            name: 'html高级编程',
            url: 'https://img1.baidu.com/it/u=337910016,91561566&fm=26&fmt=auto',
            price: 45.89,
            num: 0,
            singlePrice: 0,
            }
            ]
            let newlist=JSON.stringify(productList)
        if(url.indexOf('productList')!==-1){
           resp.setHeader('Access-Control-Allow-origin','*')
           
            resp.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            // response.writeHead(200,{'content-type':'text/html;charset=utf-8'})
            resp.write(newlist)
            resp.end()
        }
})
 server.listen(3000,()=>{
     console.log('启动')
 })