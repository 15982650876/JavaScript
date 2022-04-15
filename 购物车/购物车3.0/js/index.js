const preant = document.querySelector('.cart-list')
const zongjia=document.querySelector('.total-price')
let froms=document.querySelector('.cart-add')
var stateAll = false
//渲染函数
function show() {
    let str = `<table>
    <tr>
        <th><input type="checkbox" name="checkall" ${stateAll?'checked':''}>全选框</th>
        <th>商品图片</th>
        <th>商品信息</th>
        <th>商价</th>
        <th>数量</th>
        <th width="100px">总价</th>
        <th>操作</th>
    </tr>`
    //设置数组持久保存
    let prouductListStr = localStorage.getItem('list')
    let priolist = JSON.parse(prouductListStr) || []
    // priolist.forEach(item => {

    //     let tmp = `<tr>
    //                 <td><input type="checkbox" name="checksingle"  ${item.state?'checked':''} data-index="${item.id}"></td>
    //                 <td><img src="${item.url}" alt=""></td>
    //                 <td>${item.name}</td>
    //                 <td>￥${item.price}</td>
    //                 <td><input type="button" name="minus" value="-" data-index="${item.id}" ${item.num ==0?'disabled':''}><input type="text" name="amount" value="${item.num}"><input
    //                         type="button" name="plus" value="+" data-index="${item.id}"></td>
    //                 <td class="single-price">￥${item.singlePrice}</td>
    //                 <td> <a href="#">移入收藏</a><br><a href="#" class="del" data-index="${item.id}">删除</a></td>
    //             </tr>`
    let list = priolist.map(item => {
        return `<tr>
                    <td><input type="checkbox" name="checksingle"  ${item.state?'checked':''} data-index="${item.id}"></td>
                    <td><img src="${item.url}" alt=""></td>
                    <td>${item.name}</td>
                    <td>￥${item.price}</td>
                    <td><input type="button" name="minus" value="-" data-index="${item.id}" ${item.num ==0?'disabled':''}><input type="text" name="amount" value="${item.num}"><input
                            type="button" name="plus" value="+" data-index="${item.id}"></td>
                    <td class="single-price">￥${item.singlePrice}</td>
                    <td> <a href="#">移入收藏</a><br><a href="#" class="del" data-index="${item.id}">删除</a></td>
                </tr>`
    })
    let trStr = list.join('') //数组转字符串
    str = str + trStr + '</table>'
    // console.log(str)
    preant.innerHTML = str
    zje()
}
show()
//获取随机数函数
function getrandom(m, n) {
    let tmp = Math.max(m, n)
    n = Math.min(m, n)
    m = tmp
    return math = Math.floor(Math.random() * (m - n) + n)
}
//添加物品
function add() {
    let from = document.querySelector('form')
    from.addEventListener('click', function (e) {
        e = e || window.Event
        let target = e.target || e.srcElement
        e.preventDefault()
            const addBtn = document.querySelector('.add-btn')
            const nameInput = document.querySelector('input[name="name"]')
            const priceInput = document.querySelector('input[name="price"]')
            const numInput = document.querySelector('input[name="num"]')
            const urlInput = document.querySelector('input[name="url"]')
            let name = nameInput.value
            let price = priceInput.value
            let num = numInput.value
            let url = urlInput.value
        //判断格式
        function geshi() {
            let reg =  /^(http|https)\S*\.(jpg|png)$/
            if (name == '' || price == '' || num == '' || url == '') {
                alert('有空空没填')
                return false
            }else if (!reg.test(urlInput.value)){
                alert('url格式不对')
                return false
            } else
                return true
        }
        if (target.getAttribute('class') == "add-btn") {
            if (geshi()){
                let proudct = {
                    id: getrandom(1000, 10000),
                    name,
                    price,
                    num,
                    url,
                    singlePrice: 0,
                    state: false
                }
                let list = localStorage.getItem('list') //拿
                let newlist = JSON.parse(list) || [] //转
                newlist.push(proudct) //接
                let newprodct = JSON.stringify(newlist)
                localStorage.setItem('list', newprodct)
                nameInput.value=""
                priceInput.value=""
                 numInput.value=""
                urlInput.value=""
                froms.style.display="none"
            }
            show()
        }
      
    })

}
add()
//判断格式

//全选
function quanxuan() {
    preant.addEventListener('click', function (e) {
        e = e || window.Event
        let target = e.target || e.srcElement
        if (target.getAttribute('name') == 'checkall') {
            stateAll = !stateAll
            let list = localStorage.getItem('list') //拿
            let newlist = JSON.parse(list) || [] //转
            newlist.forEach(element => {
                element.state = stateAll

            });

            let newprodct = JSON.stringify(newlist)
            localStorage.setItem('list', newprodct)
            show()
        }
        if (target.getAttribute('name') == 'checksingle') {
            let id = target.getAttribute('data-index')
            let list = localStorage.getItem('list') //拿
            let newlist = JSON.parse(list) || [] //转
            let cartProduct = newlist.find(item => item.id == id)
            cartProduct.state = !cartProduct.state
            stateAll = newlist.every(item => item.state == true)
            let newprodct = JSON.stringify(newlist)
            localStorage.setItem('list', newprodct)
            show()
        }

    })
}
quanxuan()
//加号事件
function jia() {
    preant.addEventListener('click', function (e) {
        e = e || window.Event
        let target = e.target || e.srcElement
        if (target.getAttribute('name') == "plus") {
            let list = localStorage.getItem('list') //拿
            let newlist = JSON.parse(list) || [] //转
            let id = target.getAttribute('data-index')
            let product = newlist.find(item => item.id == id)
            product.num++
            product.singlePrice = (product.num * product.price).toFixed(2)
            let newprodct = JSON.stringify(newlist) //转
            localStorage.setItem('list', newprodct) //设
            show()
        }
    })

}
jia()
//减号事件
function jian() {
    preant.addEventListener('click', function (e) {
        e = e || window.Event
        let target = e.target || e.srcElement
        if (target.value == '-') {
            let id = target.getAttribute('data-index')
            let list = localStorage.getItem('list') //拿
            let newlist = JSON.parse(list) || [] //转
            let product = newlist.find(item => item.id == id)
            product.num--
            product.singlePrice = (product.num * product.price).toFixed(2)
            let newprodct = JSON.stringify(newlist) //转
            localStorage.setItem('list', newprodct) //设
            show()
        }
    })
}
jian()
//删除事件
function shangchu() {
    preant.addEventListener('click', function (e) {
        e = e || window.Event
        let target = e.target || e.srcElement
        if (target.getAttribute('class') == 'del') {
            let id = target.getAttribute('data-index')
            let list = localStorage.getItem('list') //拿
            let newlist = JSON.parse(list) || [] //转
            let product = newlist.findIndex(item => item.id == id)
            // console.log(product)
            newlist.splice(product, 1)
            let newprodct = JSON.stringify(newlist) //转
            localStorage.setItem('list', newprodct) //设
            show()
        }
    })
}
shangchu()
//计算总价
function zje(){
    let list = localStorage.getItem('list') //拿
    let newlist = JSON.parse(list) || [] //转
    let zje = newlist.reduce((s,item)=>{
        return s+item.singlePrice
    },0)
    //console.log(zongjia);
   zongjia.innerHTML=`￥${zje}`
}
zje()
//显示隐藏表格
function showfrom(){
   
    let but=document.querySelector('.logo>a')
    let froms=document.querySelector('.cart-add')
    but.addEventListener('click',function(){
       froms.style.display="block"
    })
}
showfrom()