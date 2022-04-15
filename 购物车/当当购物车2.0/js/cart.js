
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
//渲染事件
function xuanra(){
    // let laoda=document.querySelector('.container')
    let image=document.querySelectorAll('img')
    let name=document.querySelectorAll('.name')
    let num=document.querySelectorAll('input[name="amount"]')
    for(let i=0;i<productList.length-1;i++){
       image[i+1].src=`${productList[i].url}`
        image[i+1].style.width=`100px`
        image[i+1].style.height=`100px`
        name[i].innerHTML=`${productList[i].name}`
        num[i].value=productList[i].num
    }
    zje()
}
xuanra()
//加号事件
function jia(){
    var plusEles = document.querySelectorAll('input[name="plus"]')
    for (var i = 0; i < plusEles.length; i++) {
    plusEles[i].onclick = function () {
        amoutEle = this.previousElementSibling //数量节点
      let  sljg = this.parentElement.previousElementSibling.innerHTML
        sljg = Number(sljg.substring(1))
        amoutEle.value++
        //console.log(amoutEle.previousElementSibling.disabled)
        amoutEle.previousElementSibling.disabled = false
        this.parentElement.nextElementSibling.innerHTML = `￥${(amoutEle.value*sljg).toFixed(2)}`
        zje()
    }
    }
}
jia()
//减号事件
function jian(){
    var minusEles = document.querySelectorAll('input[name="minus"]')
    for (var i = 0; i <minusEles.length; i++) {
    minusEles[i].onclick = function () {
        amoutEle = this.nextElementSibling //数量节点
       let sljg = this.parentElement.previousElementSibling.innerHTML
        sljg = Number(sljg.substring(1))
        amoutEle.value--
        if (amoutEle.value == 1) {
            amoutEle.value = 1                
            this.disabled = true;
        }
        if (amoutEle.value == 0) {
            amoutEle.value = 0
            this.disabled = true;
        }
        this.parentElement.nextElementSibling.innerHTML = `￥${(amoutEle.value*sljg).toFixed(2)}`
        zje()
        
    }
    }
    
}
jian()
//删除事件
function shangchu() {
    var subsEles = document.querySelectorAll('.sub')
    for (var i = 0; i < subsEles.length; i++) {
        subsEles[i].onclick = function () {
            this.parentElement.parentElement.remove()
            zje()
        }
    }
    
}
shangchu()
//失去焦点事件
function jiaodian(){
    let ipt=document.querySelectorAll('input[name="amount"]')
    for (var i = 0; i < ipt.length; i++) {
    ipt[i].addEventListener('blur',function(){
        console.log(ipt[i])
        let sl=this.value
        let sljg = this.parentElement.previousElementSibling.innerHTML
        sljg = Number(sljg.substring(1))
        this.parentElement.nextElementSibling.innerHTML = `￥${(sl*sljg).toFixed(2)}`
        zje()
    })
}
}
jiaodian()
//计算商品总额事件
function zje(){
    var tmp = 0//总加
    var zj=document.querySelectorAll('.jg')
    for(let i=0;i<zj.length;i++){
        console.log(zj[i].innerHTML.substring(1))
        tmp+= Number( zj[i].innerHTML.substring(1))
        document.querySelector('.cart-list h2>span').innerText = `￥${tmp.toFixed(2)}`
        
    } if(tmp==0){
        document.querySelector('.cart-list h2>span').innerText = `￥${tmp.toFixed(2)}`
    }
   
}
zje()
//添加事件
function add() {
    let stus = `
    <td><img src="./image/shoppingBg_06.jpg" alt=""></td>
    <td>css高级编程</td>
    <td>￥58.90</td>
    <td><input type="button" name="minus" value="-" disabled>
        <input type="text" name="amount" value="0">
        <input type="button" name="plus" value="+"></td>
    <td  class="jg">￥0</td>
    <td> <a href="#">移入收藏</a><br><a  class="sub" href="#">删除</a></td>
`
    let btuadd = document.querySelector('#butss')
    let tables = document.querySelector('.cart-list>table>tbody')
    btuadd.onclick = function () {
        let trs = document.createElement('tr')
        trs.innerHTML = stus
        tables.appendChild(trs)
        jia()
        jian()
        jiaodian()
        zje()
        shangchu()
        
    }
}
add()