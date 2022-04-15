//数据
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
//动态渲染
function show(){
    let newstr=` 

    <tr>
    <th>商品图片</th>
    <th>商品信息</th>
    <th>商价</th>
    <th>数量</th>
    <th>总价</th>
    <th>操作</th>
    </tr>`
    for(let i=0;i<productList.length;i++){
        let str=`<tr>
        <td>
        <img src="${productList[i].url}" alt=""></td>
        <td class="name">${productList[i].name}</td>
        <td class="zj">￥${productList[i].price}</td>
         <td><input type="button" name="minus" value="-">
         <input type="text" name="amount" value="${productList[i].num}">
        <input type="button" name="plus" value="+"></td>
        <td style="width: 100PX;"class="jg">￥${productList[i].singlePrice}</td>
        <td> <a href="#">移入收藏</a><br><a  dateid="${productList[i].id}"href="#">删除</a></td>
</tr>`
        newstr+=str
    }
    let table=document.querySelector('.cart-list>table')
    // console.log(table)
    table.innerHTML=newstr
    jia()
    jian()
}
show()
//加号事件
function jia(){
    var plusEles = document.querySelectorAll('input[name="plus"]')
    var amounteles=document.querySelectorAll('input[name="amount"]')
    var minusEles = document.querySelectorAll('input[name="minus"]')
    let zj=document.querySelectorAll('.jg')
    for (let i = 0; i < plusEles.length; i++) {
    plusEles[i].onclick = function (){
        console.log(minusEles[i].disabled);
        minusEles[i].disabled=false
        amounteles[i].value++
        productList[i].num=amounteles[i].value
        productList[i].singlePrice=(productList[i].num*productList[i].price).toFixed(2)
        // console.log(productList[i].singlePrice)
        zj[i].innerHTML=`￥${productList[i].singlePrice}`
        zje()
        show()
    }                              
    }
}
jia()
//减号事件
function jian(){
    var minusEles = document.querySelectorAll('input[name="minus"]')
    let zj=document.querySelectorAll('.jg')
    for (let i = 0; i <minusEles.length; i++) {
      minusEles[i].onclick = function () {
        amoutEle = this.nextElementSibling //数量节点
        amoutEle.value--
        productList[i].num=amoutEle.value
        productList[i].singlePrice=(productList[i].num*productList[i].price).toFixed(2)
        // console.log(productList[i].singlePrice)
        zj[i].innerHTML=`￥${productList[i].singlePrice}`
        // console.log(productList[i])
        if (amoutEle.value == 0) {
            amoutEle.value = 0
            console.log(this.disabled)
            this.disabled= true
        }
        zje()
        show()
    }
    }
    
}
jian()
//失去焦点事件
function jiaodian(){
    let ipt=document.querySelectorAll('input[name="amount"]')
    let zj=document.querySelectorAll('.jg')
    for (let i = 0; i < ipt.length; i++) {
    ipt[i].addEventListener('blur',function(){
        productList[i].num=ipt[i].value
        productList[i].singlePrice=(productList[i].num*productList[i].price).toFixed(2)
       zj[i].innerHTML=`￥${productList[i].singlePrice}`
       zje()
    })
}
}
//计算商品总额事件
function zje(){
    let tmp = 0//总加
    var zj=document.querySelectorAll('.jg')
    for(let i=0;i<zj.length;i++){
        tmp+=Number(productList[i].singlePrice) 
         document.querySelector('.cart-list h2>span').innerText = `￥${tmp.toFixed(2)}`
    } if(tmp==0){
        document.querySelector('.cart-list h2>span').innerText = `￥${tmp.toFixed(2)}`
    }
   
}
zje()
//删除事件
function shangchu(){
    let table=document.querySelector('table')
    table.addEventListener('click',function(e){
        e=e||window.event
        var target = e.target || e.srcElement
            if(target.getAttribute('href')=="#"){ 
                let get=target.getAttribute('dateid')
                let index=productList.findIndex(item => {
                   return item.id==Number(get) 
                })
                productList.splice(index,1)
            }
        show()
        zje()
    })
}shangchu()
  //获取随机数函数
  function getrandom(m, n) {
    let tmp = Math.max(m, n)
    n = Math.min(m, n)
    m = tmp
    return math = Math.floor(Math.random() * (m - n) + n)
}
//添加
function add(){
    const addBtn = document.querySelector('.add-btn')
    const nameInput = document.querySelector('input[name="name"]')
    const priceInput = document.querySelector('input[name="price"]')
    const numInput = document.querySelector('input[name="num"]')
    const urlInput = document.querySelector('input[name="url"]')
    addBtn.addEventListener('click',function(e){
        e = e || window.event
        e.preventDefault()
        let name = nameInput.value  
        let price = priceInput.value 
        let num = numInput.value  
        let url = urlInput.value  
        let id =getrandom(1000, 10000)
        let product = {
            id,
            name,
            url,
            price,
            num,
            singlePrice: 0,
        }
        productList.push(product)
        console.log(productList)
        show()
    })
}
add()
