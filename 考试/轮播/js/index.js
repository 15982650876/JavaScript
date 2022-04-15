
class Tab {
    constructor(id) {
        this.root = document.querySelector(id);
        this.ulEles = document.querySelectorAll('ul>li');
        this.olEles = document.querySelectorAll('ol>li');
    }
    onTab() {
        let rootThis = this;
        for (let i = 0; i < this.ulEles.length; i++) {
            this.ulEles[i].addEventListener('click', function () {
                rootThis.onClear();
                this.classList.add('active');
                rootThis.onWrap();
                rootThis.olEles[i].classList.add('on');
            })
        }
    }

    onClear() {
        for (var j = 0; j < this.ulEles.length; j++) {
            this.ulEles[j].classList.remove('active');
        }
    }

    onWrap() {
        for (var k = 0; k < this.olEles.length; k++) {
            this.olEles[k].classList.remove('on');
        }
    }
}

function iconMove() {
    var bigBox = document.querySelector('.container ol');
    var pBox = document.querySelector('.container .box');

    bigBox.onmouseover = function () {
        console.log('1');
        pBox.style.display = 'block';
    }

    bigBox.onmouseout = function () {
        console.log('2');
        pBox.style.display = 'none';
    }


    bigBox.onmousemove = function (e) {
  
        e = e || window.event
        
        var x = e.offsetX - pBox.clientWidth / 2
        var y = e.offsetY - pBox.clientHeight / 2
     
        if (x < 0) {
            x = 0
        }
        if (x > bigBox.clientWidth - pBox.clientWidth) {
            x = bigBox.clientWidth - pBox.clientWidth
        }
        if (y < 0) {
            y = 0
        }
        if (y > bigBox.clientHeight - pBox.clientHeight) {
            y = bigBox.clientHeight - pBox.clientHeight
        }
    
        pBox.style.left = x + 'px'
        pBox.style.top = y + 'px'

    }
}

let tab1 = new Tab('#tab1');
tab1.onTab();
iconMove();
