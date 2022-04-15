let user = document.querySelector('input[type="text"]')
let paswd = document.querySelector('input[type="password"]')
let forms = document.querySelector('form')
//验证用户名非空函数
function isname() {
        let tuser=localStorage.getItem('user')
         tuser=JSON.parse(tuser)
        console.log(tuser)
        if(user.value==tuser){
            return true
        }
        else
        return false
       
    
}
//验证密码非空函数
function ispwd() {
    let tpwd=localStorage.getItem('pwd')
    tpwd=JSON.parse(tpwd)
        if(paswd.value==tpwd){
            return true
        }
        else
        return false
}
//提交函数
function tijiao(){
    if (isname() == true && ispwd() == true) {
        location.href="https://www.jd.com?456"
    }
    else{
        alert('账户或密码错误')
    }
    
}
user.addEventListener('blur', function(){
    isname()
}) //验证用户名
paswd.addEventListener('blur', function(){
    ispwd()
}) //验证密码
forms.addEventListener('submit', function (e) {
    e.preventDefault()
    tijiao()
})
//注册
let user2 = document.querySelector('input[name="user"]')
let paswd2 = document.querySelector('input[name="password"]')
let forms2 = document.querySelector('form[name="from"]')
//验证用户名非空函数
function isname1() {
    let ps = document.querySelectorAll('p')
    if (user2.value == '') {
        ps[3].style.opacity = '1'
        return false
    } else {
        ps[3].style.opacity = '0'
        return true

    }
}
//验证密码非空函数
function ispwd1() {
    let ps = document.querySelectorAll('p')
    if (paswd2.value == '') {
        ps[4].style.opacity = '1'
        return false
    } else {
        ps[4].style.opacity = '0'
        let reg=/^[A-Z][0-9a-zA-Z]{7,}/
      console.log(reg.test(paswd2.value));  
        if(reg.test(paswd2.value)){
            // ps[5].style.opacity='0'
            return true
        }else{
           alert('密码格式不对，要开头字母大写至少...')
            return false
        }
    }
}
//提交函数
function tijiao1(){
    if (isname1() == true && ispwd1() == true) {
       let u=user2.value
       let p=paswd2.value
       let newu=JSON.stringify(u)
       let newp=JSON.stringify(p)
       localStorage.setItem('user',newu)
       localStorage.setItem('pwd',newp)
       alert('注册成功')
    }
    else{
        alert('修改')
    }
    
}
user2.addEventListener('blur', function(){
    isname1()
}) //验证用户名
paswd2.addEventListener('blur', function(){
    ispwd1()
}) //验证密码
forms2.addEventListener('submit', function (e){
    e.preventDefault()
    tijiao1()
})