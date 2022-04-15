var productList = [{
        id: 1001, //商品序号
        name: 'js高级编程', //商品名
        url: 'https://img1.baidu.com/it/u=454394458,1998378568&fm=253&fmt=auto&app=138&f=JPEG', //商品图片
        price: 68.90, //商品价格
        num: 0, //商品数量
        singlePrice: 0, //商品总价=数量*价格    
        state: false //状态
    },
    {
        id: 1002,
        name: 'css高级编程',
        url: 'https://img1.baidu.com/it/u=337910016,91561566&fm=26&fmt=auto',
        price: 55.89,
        num: 0,
        singlePrice: 0,
        state: false //状态
    },
    {
        id: 1003,
        name: 'html高级编程',
        url: 'https://img1.baidu.com/it/u=337910016,91561566&fm=26&fmt=auto',
        price: 45.89,
        num: 0,
        singlePrice: 0,
        state: false //状态
    }
]

let stateAll = false //全选状态
/**
    全选思路:
       1. 定义全局变量表示全选状态 stateAll
       2. 商品数组中给每个商品定义一个state状态属性表示改商品是否选中
       3. 动态渲染的商品列表table表格中使用三目运算根据状态值判断复选框是否选中
            <input type="checkbox" name="checkall" ${stateAll?'checked':''}>
            <input type="checkbox" name="checksingle" ${item.state?'checked':''}>
        



 */

const rootEle = document.querySelector('.cart-list')

/**
 * 动态渲染商品列表
 *   =>注释的静态tabel表格，使用js代码拼接成字符串显示出来
 */
function loadProductList() {
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
    //循环遍历商品数组，拼接商品列表成表格项tr字符串
    let newArray = productList.map(item => {
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
    let trStr = newArray.join('')

    str = str + trStr + '</table>'

    rootEle.innerHTML = str
}

/**
 * 购物车功能
 *   加一
 */
function onCart() {
    //事件委托给父节点
    rootEle.addEventListener('click', function (e) {
        e = e || window.event //事件对象
        let target = e.target || e.srcElement //事件目标对象

        if (target.value == '+') {
            //操作商品数组数据
            //1.获取当前点击商品ID
            let id = target.getAttribute('data-index')
            //2.根据id查找商品
            let product = productList.find(item => item.id == id)
            product.num++
            //2.1计算价格
            product.singlePrice = (product.num * product.price).toFixed(2)
            //3.重新渲染商品列表
            loadProductList()
        }

        if (target.value == '-') {
            //1.获取当前点击商品ID
            let id = target.getAttribute('data-index')
            //2.根据id查找商品
            let product = productList.find(item => item.id == id)
            product.num--
            //2.1计算价格
            product.singlePrice = (product.num * product.price).toFixed(2)
            //3.重新渲染商品列表
            loadProductList()
        }

        /*
          删除
           1.0 操作节点
              => 根据当前删除节点，查找父节点tr, 执行父节点tr删除操作
           2.0 操作数据 - 商品列表数组
              => 根据当前删除节点，获取删除商品id值，
                 根据id查找索引号删除数组商品 
                     let index = productList.findIndex(item=>item.id == id)
                     prouctList.splice(index,1)

        */
        if(target.getAttribute('class') == 'del'){
            //1.根据当前删除节点，获取删除商品id值
            let id = target.getAttribute('data-index')
            //2.根据id查找索引号
            // findIndex: 遍历数组，查找数组中满足条件的元素索引号
            let index = productList.findIndex(item=>item.id == id)
            //3.删除数组商品
             console.log(index);
            // productList.splice(index,1)
            //4.重新渲染页面

            loadProductList()
        }

        /**
           全选框操作
             1. 设置全选框状态  stateAll = !stateAll
             2. 设置所有商品列表state状态
                   根据stateAll设置,如果stateAll选中也就是true,所有商品列表state也要选中它值也是true
             3. 重新渲染界面
         
         */
        if(target.getAttribute('name') == 'checkall'){
            // 1. 设置全选框状态
            stateAll = !stateAll 
            // 2. 设置所有商品列表state状态
            productList.forEach(item=>item.state = stateAll)   
            console.log(productList);
            // 3.重新渲染页面
            loadProductList()
        }

        /**
         * 点击单选框事件
         *   设置单选框状态state,取反
         *   设置全选框状态stateAll值
         *       商品数组中所有单选框state为true,全选框才为true
         */
        if(target.getAttribute('name') == 'checksingle'){
            let id = target.getAttribute('data-index')
            let product = productList.find(item => item.id == id)
            //1.设置单选框状态state,取反
            product.state = !product.state
            //2.设置全选框状态stateAll值
            stateAll = productList.every(item => item.state == true)
            // 3.重新渲染页面
            loadProductList()
        }


    })
}

/**
 * 添加商品
 *   思路: 当点击商品提交按钮时，获取商品数据，生成商品对象,添加到商品列表数组中，重新加载商品列表页面
 *  
 */
function addProduct(){
    const addBtn = document.querySelector('.add-btn')
    const nameInput = document.querySelector('input[name="name"]')
    const priceInput = document.querySelector('input[name="price"]')
    const numInput = document.querySelector('input[name="num"]')
    const urlInput = document.querySelector('input[name="url"]')
    //1.当点击商品提交按钮时
    addBtn.addEventListener('click',function(e){
        //阻止表单默认行为
        e = e || window.event
        e.preventDefault()

        //2.获取商品数据
        let name = nameInput.value  //名称
        let price = priceInput.value //价格
        let num = numInput.value  //数量
        let url = urlInput.value  //图片url地址
        let id = getRandom(1000,10000) //随机生成4位id值
        //3.生成商品对象
        let product = {
            id,
            name,
            url,
            price,
            num,
            singlePrice: 0,
        }
        //4添加到商品列表数
        productList.push(product)

        //5.重新渲染页面
        loadProductList()
    })
}


loadProductList()
onCart()
addProduct()

function getRandom(m,n){
    var x = Math.max(m,n)
    var y = Math.min(m,n)
    return Math.floor(Math.random() * (x-y) + y )
 }
