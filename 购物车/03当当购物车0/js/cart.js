/**
 * 数量加一功能
 *   => 点击商品列表中任意商品加号，让对应商品数量增加一
 *     1. 给商品列表所有加号绑定点击事件
 *     2. 数量加一
 */
function onPlus(){
    //1. 给商品列表所有加号绑定点击事件
    //1.1 所有商品加号节点
    var plusEles = document.querySelectorAll('input[name="plus"]')
    for(var i = 0; i < plusEles.length; i++){
        plusEles[i].onclick = function(){
            var amoutEle = this.previousElementSibling //数量节点
            amoutEle.value++
            //测试减号为0时不可用
            // var minusEle = this.previousElementSibling.previousElementSibling 
            // // minusEle.setAttribute('disabled',true)
            // minusEle.removeAttribute('disabled')
        }
    }
}
onPlus()