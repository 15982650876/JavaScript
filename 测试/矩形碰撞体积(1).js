   function ifpz(div, graphArr, str) {
   // console.log(graphArr.length);
       for (let i = 0; i < graphArr.length; i++) {
           let divminh = parseInt(div.style.top) || 0
           let divminw = parseInt(div.style.left) || 0

           let divmaxw = divminw + parseInt((window.getComputedStyle(div).width ||
               div.style.width))
           let divmaxh = divminh + parseInt((window.getComputedStyle(div).width ||
               div.style.height))
           let minw = parseInt(graphArr[i].style.left || 0)
           let maxw = minw + parseInt((window.getComputedStyle(graphArr[i]).width ||
               graphArr[i].style.width))
           let minh = parseInt(graphArr[i].style.top || 0)
           let maxh = minh + parseInt((window.getComputedStyle(graphArr[i]).height ||
               graphArr[i].style.height))
           if (div == graphArr[i])
               continue
           let flagh
           let flagw
           if (divminw <= minw && divmaxw >= maxw && divminh <= minh && divmaxh >= maxh) {
               flagh = true
               flagw = true
           } else if (divminh < minh && divmaxh > maxh) {
               flagh = true
               flagw = (divmaxw > minw && divmaxw < maxw) || (divminw < maxw && divminw > minw)
           } else if (divminw < minw && divmaxw > maxw) {
               flagw = true
               flagh = (divmaxh > minh && divmaxh < maxh) || (divminh < maxh && divminh > minh)
           } else {
               flagh = (divmaxh > minh && divmaxh < maxh) || (divminh < maxh && divminh > minh)
               flagw = (divmaxw > minw && divmaxw < maxw) || (divminw < maxw && divminw > minw)
           }
           if (flagh && flagw) {
               if (str == undefined)
                   return false
               else
                   return [div, graphArr[i]]
           }
       }
       return true
   }
   //节点  所有节点  返回值
   function adhesion(div, graphArr, str) {
       let divs = ifpz(div, graphArr, str)
       if (divs[0] == undefined || divs[1] == undefined)
           return divs
       str = parseInt(str)
       if (Object.is(str, NaN)) {
           return divs
       }
       let divminh = parseInt(divs[0].style.top) || 0
       let divminw = parseInt(divs[0].style.left) || 0
       let divmaxw = divminw + parseInt((window.getComputedStyle(divs[0]).width ||
           divs[0].style.width))
       let divmaxh = divminh + parseInt((window.getComputedStyle(divs[0]).width ||
           divs[0].style.height))
       let minw = parseInt(divs[1].style.left || 0)
       let maxw = minw + parseInt((window.getComputedStyle(divs[1]).width ||
           divs[1].style.width))
       let minh = parseInt(divs[1].style.top || 0)
       let maxh = minw + parseInt((window.getComputedStyle(divs[1]).height ||
           divs[1].style.height))
       if (maxw - divminw <= str) {
           divs[0].style.left = `${maxw}px`
       } else if (divmaxw - minw <= str) {
           divs[0].style.left = `${minw-(divmaxw-divminw)}px`
       }
       console.log(divmaxh - minh)
       if (divmaxh - minh <= 50 + str) {
           divs[0].style.top = `${minh-(divmaxh-divminh)+50}px`
       }
   }