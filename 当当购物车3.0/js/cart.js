let stateAll = false //全选框状态
const rootEle = document.querySelector('.cart-list')
/**
 * 动态渲染购物车商品列表数据
 *    商品列表数据到自localStorage
 */
function loadProductList() {
    let prouductListStr = localStorage.getItem('CART-LIST')
    let productList = JSON.parse(prouductListStr) || []

    //table拼接
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
    let list = productList.map(item => {
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
    rootEle.innerHTML = str
}

/**
 * 添加商品到购物车
 *    持久化存储到localStorage
 */
function addProduct() {
    const addBtn = document.querySelector('.add-btn')
    const nameInput = document.querySelector('input[name="name"]')
    const priceInput = document.querySelector('input[name="price"]')
    const numInput = document.querySelector('input[name="num"]')
    const urlInput = document.querySelector('input[name="url"]')
    //绑定添加商品事件
    addBtn.addEventListener('click', function (e) {
        //阻止默认行为action
        e = e || window.event
        e.preventDefault()

        let name = nameInput.value
        let price = priceInput.value
        let num = numInput.value
        let url = urlInput.value
        let id = getRandom(1000, 10000)
        let proudct = {
            id,
            name,
            price,
            num,
            url,
            singlePrice: 0,
            state: false
        } //商品对象

        //从localStorage中获取购物车数组
        let cartListStr = localStorage.getItem('CART-LIST')
        let cartList = JSON.parse(cartListStr) || []
        
        //添加商品到购物车数组
        cartList.push(proudct)
        //持久化存储购物车数组到localStorage
        localStorage.setItem('CART-LIST', JSON.stringify(cartList))

        //重新渲染页面
        loadProductList()
    })
}

/**
 * 购物车功能
 */
function onCart() {
    rootEle.addEventListener('click', function (e) {
        e = e || window.event
        let target = e.target || e.srcElement

        //全选框
        if (target.getAttribute('name') == 'checkall') {
            stateAll = !stateAll //设置全选框状态
            //购物车数组
            let cartListStr = localStorage.getItem('CART-LIST')
            let cartList = JSON.parse(cartListStr) || []

            cartList.forEach(item => item.state = stateAll) //设置所有单选框状态
            //持久化存储单选框状态
            localStorage.setItem('CART-LIST', JSON.stringify(cartList))
            //重新加载页面
            loadProductList()
        }
        //单选框
        if (target.getAttribute('name') == 'checksingle') {
            //根据点单选框商品ID查找购物车数组中商品，改变其状态
            let id = target.getAttribute('data-index')
            //购物车数组
            let cartListStr = localStorage.getItem('CART-LIST')
            let cartList = JSON.parse(cartListStr) || []
            //查找购物车数组中商品
            let cartProduct = cartList.find(item => item.id == id)
            cartProduct.state = !cartProduct.state //设置点击单选框状态
            //设置全选框状态
            stateAll = cartList.every(item => item.state == true)
            //持久化存储单选框状态
            localStorage.setItem('CART-LIST', JSON.stringify(cartList))
            //重新加载页面
            loadProductList()
        }
    })
}

loadProductList()
addProduct()
onCart()

function getRandom(m, n) {
    var x = Math.max(m, n)
    var y = Math.min(m, n)
    return Math.floor(Math.random() * (x - y) + y)
}