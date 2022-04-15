
function myPromise(options) {
    return new Promise((resovle, reject) => {
        const xhr = new window.XMLHttpRequest()
        let params = formatParmas(options.data) //uid=101
        let method = options.method.toUpperCase()
        if (method == 'GET') {
            xhr.open(method, options.url + '?' + params)
            xhr.send()
        } else if (method == 'POST') {
            xhr.open(method, options.url)
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
            xhr.send(params)
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let data = xhr.responseText
                    data = JSON.parse(data)
                    resovle(data)
                } else {
                    reject('网络请求失败')
                }
            }
        }
    })

}


/**
 * ajax网络请求工具函数
 * ajax(  {
            method: 'get',
            url: 'http://10.7.178.117:8088/api/delete',
            data: {
                uid: 101
            },
            success: function (data) {
                console.log('success => ', data);
            },
            error: function (err) {
                console.log('error => ', err);
            }
        })
 * @param {*} options 
 */
function myAjax(options) {
    const xhr = new window.XMLHttpRequest()
    let params = formatParmas(options.data) //uid=101
    let method = options.method.toUpperCase()
    if (method == 'GET') {
        xhr.open(method, options.url + '?' + params)
        xhr.send()
    } else if (method == 'POST') {
        xhr.open(method, options.url)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(params)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let data = xhr.responseText
                data = JSON.parse(data)

                options.success(data)
            } else {
                options.error('网络请求失败')
            }
        }
    }
}

function formatParmas(paramsData) {
    let arr = []
    for (let key in paramsData) {
        arr.push(`${key}=${paramsData[key]}`) //[username=admin,password=123]
    }
    let str = arr.join('&')
    return str
}