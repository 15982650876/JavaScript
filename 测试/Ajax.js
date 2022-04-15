// ajaxpromins({
//     method:'get',
//     date:{

//     },
//     url:''
// })

function myPromise(promis){
    return new Promise((resovle, reject) =>{
    let xhr=new window.XMLHttpRequest()
    let str =urlpj(promis.date)
    let method=promis.method.toUpperCase()
    if (method == 'POST') {
        xhr.open(`${method}`, `${promis.url}`)
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(`${str}`)
    } else if (method == 'GET') {
        xhr.open(`${method}`, `${promis.url}?${str}`)
        xhr.send()
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let date = xhr.responseText
                date = JSON.parse(date)
                resovle(date)
            } else {
                reject('失败') 
            }
        }
    }
})
}
// function myPromise(options) {
//     return new Promise((resovle, reject) => {
//         const xhr = new window.XMLHttpRequest()
//         let params = urlpj(options.data) //uid=101
//         let method = options.method.toUpperCase()
//         if (method == 'GET') {
//             xhr.open(method, options.url + '?' + params)
//             xhr.send()
//         } else if (method == 'POST') {
//             xhr.open(method, options.url)
//             xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
//             xhr.send(params)
//         }
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4) {
//                 if (xhr.status == 200) {
//                     let data = xhr.responseText
//                     data = JSON.parse(data)
//                     resovle(data)
//                 } else {
//                     reject('网络请求失败')
//                 }
//             }
//         }
//     })

// }



//拼接函数
function urlpj(date) {
    let arr = []
    for (let key in date) {
        arr.push(`${key}=${date[key]}`) //[username=admin,password=123]
    }
    let str = arr.join('&')
    return str
}
//ajax类
class user {
    constructor(promis) {
        this.promis = promis
    }
    //拼接字符串
    urlpj(date) {
        let arr = []
        for (let key in date) {
            arr.push(`${key}=${date[key]}`) //[username=admin,password=123]
        }
        let str = arr.join('&')
        return str
    }
    //ajax函数
    ajax() {
        let _this = this
        let xhr = new window.XMLHttpRequest()

        // console.log(_this.promis.date)
        let str = _this.urlpj(_this.promis.date)
        // console.log(str)
        let method = _this.promis.method.toUpperCase()
        if (method == 'POST') {
          
            xhr.open(`${method}`, `${_this.promis.url}`)
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            xhr.send(`${str}`)
        } else if (method == 'GET') {
            xhr.open(`${method}`, `${_this.promis.url}?${str}`)
            xhr.send()
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let date = xhr.responseText
                    date = JSON.parse(date).resultInfo
                    _this.promis.success(date)
                } else {
                    _this.promis.error('网络错误')
                }
            }
        }
    }

}