   function ifpz(div,graphArr) {
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
            let maxh = minw + parseInt((window.getComputedStyle(graphArr[i]).height ||
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
                flagw =(divmaxw > minw && divmaxw < maxw )|| (divminw < maxw && divminw > minw)
            } else if (divminw < minw && divmaxw > maxw) {
                flagw = true
                flagh = (divmaxh > minh && divmaxh < maxh )|| (divminh < maxh && divminh > minh)
            } else {
                flagh = (divmaxh > minh && divmaxh < maxh) || (divminh < maxh && divminh > minh)
                flagw = (divmaxw > minw && divmaxw < maxw) || (divminw < maxw && divminw > minw)
            }
            if (flagh && flagw) {
                return false
            }
        }
        return true
    }







