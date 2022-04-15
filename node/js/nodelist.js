const Cookiestr = require("./cookie")

class App {
    constructor() {
        this.Cookiestr = new Cookiestr()
        this.http = require('http')
        this.querystring = require('querystring');
        this.htmlurl = require('url');
        this.funArr = []
        this.server = null
        this.cookies = []
        this.header = []
    }
    updatacookie(url , cookie){

        let c= this.cookies.find((value)=>{
            return value.url==url
        })
        if(c==undefined){
            this.cookies.push({
                url,
                value:cookie
            })
        }else{
            c.value=cookie
        }
    }
    setcookie(url, key, cookie, expires) {
        let cookiestr = typeof cookie == "string" ? cookie : JSON.stringify(cookie)
        let value = this.Cookiestr.setCookieStr(key, cookiestr, expires)
        this.updatacookie(url,value)
    }
    getcookie(cookiestr, key) {
        return this.Cookiestr.getCookie(cookiestr, key)
    }
    run(prot) {
        let _this = this
        this.server = this.http.createServer(function (req, resp) {
            resp.setHeader('Access-Control-Allow-Origin', '*')
            resp.setHeader('Content-Type', 'text/html; charset=utf-8')
            for (let i = 0; i < _this.cookies.length; i++) {
                console.log(req.url,">>>>>", _this.cookies[i].url);
                if (req.url== _this.cookies[i].url) {
                    // console.log(_this.cookies[i].value);
                    // console.log("list>>>", _this.cookies);
                    resp.writeHead(200, {
                        //'text/html;charset=utf-8',application/json  }
                        // 'Content-Type': 'text/plain; charset=utf-8',
                        'Set-Cookie': [`${_this.cookies[i].value}`],
                    })
                }
            }

            let url = req.url
            console.log(url);
            for (let i = 0; i < _this.funArr.length; i++) {
                let f = _this.funArr[i]
                f(req, resp)
            }

        })
        this.server.listen(prot, () => console.log(`服务器启动成功，监听${prot}端口`))
    }
    post(url, a) {
        let _this = this
        let fun = function (req, resp) {
            if (url == _this.htmlurl.parse(req.url, true).pathname)
                if (req.method == "POST") {
                    let data = ""
                    req.on("data", function (chuan) {
                        data += chuan
                    })
                    req.on("end", function () {
                        data = _this.querystring.parse(data);
                        console.log("成功接收数据:", data)
                        a(data, req, resp)
                    })
                }
        }
        this.funArr.push(fun)
    }
    get(url, a) {
        let _this = this
        let fun = function (req, resp) {
            if (url == _this.htmlurl.parse(req.url, true).pathname)
                if (req.method == "GET") {
                    a(_this.htmlurl.parse(req.url, true).query, req, resp)
                }
        }
        this.funArr.push(fun)
    }
}

module.exports = App;

/*
function post(url,a){
    let fun=function (){
        if(url==req.url){
            let post=""
            req.on("data",function(chuan){
               post+=chuan
           })
           req.on("end",function(){
               post=querystring.parse(post);
               a(post) 
           })
        }
    }
    funArr.push(fun)
}

*/