function setCookie(key,value,expires){
    if(value instanceof String){
        
    }else{
        value = JSON.stringify(value)
    }
    let date=new Date()
    date.setTime(date.getTime()-1000*60*60*8+expires)
    document.cookie=`${key}=pare:${value};expires=${date}`
}
function setCookieStr(key,value,expires){
    if(value instanceof String){
        
    }else{
        value = JSON.stringify(value)
    }
    let date=new Date()
    date.setTime(date.getTime()-1000*60*60*8+expires)
   return `${key}=pare:${value};expires=${date}`
}
function getCookie(key){
    let cookies=document.cookie.split(";")
    let cookie={}
    cookies.forEach((value)=>{
        let cookieArr=value.split("=pare:")
        let cookiekey=cookieArr[0].trim()
        console.log(cookieArr[1]);
        if(cookiekey==key){
            try {
              cookie= JSON.parse(cookieArr[1])
            } catch (error) {
                cookie=cookieArr[1]
            }
            
        }
    })
    return cookie
}
function removCookie(key){
    setCookie(key,"",-1)
}
class CookieStr{
    setCookieStr(key,value,expires){
        if(value instanceof String){
            
        }else{
            value = JSON.stringify(value)
        }
        let date=new Date()
        date.setTime(date.getTime()-1000*60*60*8+expires)
       return `${key}=pare:${value}; `
    }
    getCookie(cookiestr,key){
        if(cookiestr==null){
            return null
        }else if (typeof cookiestr !="string"){
            console.log("切割cookieStr出错不是字符串");
            return cookiestr
        }
        let cookies=cookiestr.split(";")
        let cookie={}
        cookies.forEach((value)=>{
            let cookieArr=value.split("=pare:")
            let cookiekey=cookieArr[0].trim()
            console.log(cookieArr[1]);
            if(cookiekey==key){
                try {
                  cookie= JSON.parse(cookieArr[1])
                } catch (error) {
                    cookie=cookieArr[1]
                }
                
            }
        })
        return cookie
    }
}
module.exports=CookieStr;