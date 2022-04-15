
var productList = [{
        id: 1001, //商品序号
        name: 'js高级编程', //商品名
        url: 'https://img1.baidu.com/it/u=454394458,1998378568&fm=253&fmt=auto&app=138&f=JPEG', //商品图片
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
let table = document.querySelector(".cart-table")

function loding() {
    let str = `<tr>
            <th><input type="checkbox"  name="checkall" onclick="checkboxAll()">全选框</th>
            <th>商品图片</th>
            <th>商品信息</th>
            <th>商价</th>
            <th>数量</th>
            <th width="100px">总价</th>
            <th>操作</th>
        </tr>`

    for (let i = 0; i < productList.length; i++) {
        str += `<tr>
            <td><input type="checkbox" name="checksingle" onclick="checkBoxSingle()"  data-index="${productList[i].id}"></td>
            <td><img src="${productList[i].url}" alt=""></td>
            <td>${productList[i].name}</td>
            <td>￥${productList[i].price}</td>
            <td><input type="button" name="minus" value="-" data-index="${productList[i].id}" ${productList[i].num ==0?'disabled':''}>
                <input type="text" name="amount" value="${productList[i].num}"><input
                    type="button" name="plus" value="+" data-index="${productList[i].id}"></td>
            <td class="single-price">￥${productList[i].singlePrice}</td>
            <td> <a href="#">移入收藏</a><br><a href="#" class="del" data-index="${productList[i].id}">删除</a></td>
        </tr>`
    }
    table.innerHTML = str
    let sum = 0
    productList.forEach((value) => {
        sum += value.singlePrice
    })
    table.nextElementSibling.lastElementChild.innerHTML = sum.toFixed(2) + ""
}
loding()
table.onclick = (e) => {
    e = e || window.event
    let target = e.target || e.srcElement
    if (target.value == "+") {
        let id = target.getAttribute('data-index')
        let product = productList.find((value) => {
            return value.id == id
        })
        product.num++
        product.singlePrice += product.price
        loding()
    }
    if (target.value == "-") {
        let id = target.getAttribute('data-index')
        let product = productList.find((value) => {
            return value.id == id
        })
        product.num--
        product.singlePrice -= product.price
        loding()
    }

    if (target.innerText == "删除") {
        let id = target.getAttribute('data-index')
        let product = productList.forEach((value, index) => {
            if (value.id == id) {
                console.log(index);
                productList.splice(index, 1)
            }
        })
        loding()
    }

}
let deleteall = document.querySelector("#deleteall")
deleteall.onclick = () => {
    let danxuan = document.querySelectorAll("input[name='checksingle']")
    let ids = []

    for (let i = 0; i < danxuan.length; i++) {
        if (danxuan[i].checked == true) {
            let id = danxuan[i].getAttribute("data-index")
            ids.push(id)
        }
    }
    console.log(ids);
    ids.forEach((value) => {
        productList.forEach((itme, index1) => {
            console.log(itme, index1);
            if (itme.id == value) {
                productList.splice(index1, 1)
            }
        })
    })
    loding()
}

function checkboxAll() {
    let quan = document.querySelector("input[name='checkall']")
    let danxuan = document.querySelectorAll("input[name='checksingle']")
    console.log(quan.checked);
    let ofa = quan.checked
    if (ofa == true) {
        for (let i = 0; i < danxuan.length; i++) {
            danxuan[i].checked = true
        }
    } else {
        for (let i = 0; i < danxuan.length; i++) {
            danxuan[i].checked = false
        }
    }
}

function checkBoxSingle() {
    let quan = document.querySelector("input[name='checkall']")
    let danxuan = document.querySelectorAll("input[name='checksingle']")

    let ofa = quan.checked
    for (let i = 0; i < danxuan.length; i++) {
        if (danxuan[i].checked == false) {
            return quan.checked = false
        }
    }
    quan.checked = !ofa
}

// 添加
let idsum = productList[productList.length - 1].id
let addproduct = document.querySelector(".cart-add")

function ifname(target) {
    if (target.value == "") {
        target.nextElementSibling.nextElementSibling.innerText = "名字不能为空"
        return false
    } else {
        target.nextElementSibling.nextElementSibling.innerText = ""
    }
    return true
}

function ifnum(target) {
    if (target.value == "" || target.value == 0) {
        target.nextElementSibling.nextElementSibling.innerText = "数量不能为0或者空"
        return false
    } else if (Object.is(parseInt(target.value), NaN)) {
        target.nextElementSibling.nextElementSibling.innerText = "数量格式不规范"
        return false
    } else {
        target.nextElementSibling.nextElementSibling.innerText = ""
    }
    return true
}

function ifprice(target) {
    if (target.value == "" || target.value == 0) {
        target.nextElementSibling.nextElementSibling.innerText = "价格不能为0或者空"
        return false
    } else if (Object.is(parseFloat(target.value), NaN)) {
        target.nextElementSibling.nextElementSibling.innerText = "价格格式不规范"
        return false
    } else {
        target.nextElementSibling.nextElementSibling.innerText = ""
    }
    return true
}

function ifurl(target) {
    let reg = /^(http|https)\S*\.(jpg|png)$/
    if (target.value == "" || target.value == 0) {
        target.nextElementSibling.nextElementSibling.innerText = "价格不能为0或者空"
        return false
    } else if (!reg.test(target.value)) {
        target.nextElementSibling.nextElementSibling.innerText = "url格式不规范"
        return false
    } else {
        target.nextElementSibling.nextElementSibling.innerText = ""
    }
    return true
}

function addif() {
    return ifname(forms[0]) || ifnum(forms[2]) || ifprice(forms[1]) || ifurl(forms[3])
}
addproduct.oninput = (e) => {
    e = e || window.event
    let target = e.target || e.srcElement
    console.log(target.value == "");
    let flag = false
    if (target.name == "name") {
        ifname(target)
    }
    if (target.name == "num") {
        ifnum(target)
    }
    if (target.name == "price") {
        ifprice(target)
    }
    if (target.name == "url") {
        ifurl(target)
    }
}
var forms = addproduct.querySelectorAll("input")
addproduct.firstElementChild.lastElementChild.onclick = () => {
    if (addif()) {
        let pro = {}
        pro.id = ++idsum
        pro.name = forms[0].value
        pro.num = parseInt(forms[2].value)
        pro.price = parseFloat(forms[1].value)
        pro.url = forms[3].value
        pro.singlePrice=(parseInt(forms[2].value)* parseFloat(forms[1].value))
        productList.push(pro)
        loding()
        return false
    }
}
