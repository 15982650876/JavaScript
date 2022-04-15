/**
 * 放大镜
 *   元素尺寸:
 *     内容： window.getComputedStyle(元素).width
 *     内容+padding : clientWidth
 *     内容 + padding +borer: offsetWidth 
 * 
 *    步骤:
 *        1.创建放大镜类Glass
 *        2. 构造器constructor，定义属性
 *                遮罩层， 显示盒子showbox,  放大镜盒子glassBox, 背景图片bigPicm,所有选项li
 *        3. 计算元素比例
 *             遮罩层mask            放大镜 glassBox
 *              -----           =    ----------------
 *              显示盒子showBox       背景图片 bigPic ?
 *        4. 放大镜核心功能
 *              遮罩层随光标在showBox盒子中移动，放大镜中背景随之移动
 *                1. 光标在showBox盒子移动事件
 *                2. 获取光标位置设置给遮罩层
 *                3. 计算背景图和遮罩层移动比
 *        5. 移入显示遮罩层
 *        6. 移出隐藏遮罩层
 *        7. 选项切换功能
 * 
 *        8.实例化放大镜
 *              
 * 
 * 
 */
class Glass {
    constructor(id) {
        this.rootEle = document.querySelector(id)
        //遮罩层
        this.mask = this.rootEle.querySelector('.mask')
        //显示盒子showbox
        this.showBox = this.rootEle.querySelector('.show-box')
        //放大镜盒子glassBox
        this.glassBox = this.rootEle.querySelector('.right-box')
        //背景图片bigPic
        this.bigPic = this.rootEle.querySelector('.right-box>img')
        //所有选项目
        this.lis = this.rootEle.querySelectorAll('li')
    }
    /**
     * 调整比例
     *   遮罩层          glassBox
     *   -----   =  ------------
     *   showBox        bigPic
     *    
     *   bigPicWidth = glassBoxW*showBoxW/遮罩层
     */
    setScale() {
        let bigPicWidth = parseInt(this.showBox.clientWidth * this.glassBox.clientWidth / this.mask.clientWidth)
        let bigPicHeight = parseInt(this.showBox.clientHeight * this.glassBox.clientHeight / this.mask.clientHeight)

        this.bigPic.style.width = bigPicWidth + 'px'
        this.bigPic.style.height = bigPicHeight + 'px'
    }

    /**
     * 放大镜核心功能
     *   遮罩层随光标在showBox盒子中移动，放大镜中背景移之移动
     *     1. showBox盒子中移动事件
     */
    onGlass() {
        let _this = this
        this.showBox.addEventListener('mousemove', function (e) {
            e = e || window.event
            let x = e.offsetX - _this.mask.clientWidth / 2
            let y = e.offsetY - _this.mask.clientHeight / 2

            //边界查检
            if (x < 0) {
                x = 0
            }
            if (x > _this.showBox.clientWidth - _this.mask.clientWidth) {
                x = _this.showBox.clientWidth - _this.mask.clientWidth
            }
            if (y < 0) {
                y = 0
            }
            if (y > _this.showBox.clientHeight - _this.mask.clientHeight) {
                y = _this.showBox.clientHeight - _this.mask.clientHeight
            }

            _this.mask.style.left = x + 'px'
            _this.mask.style.top = y + 'px'

            //移动大背景图片
            /**
                 x         maskW
               ----   =  -------- 
               moveX       glassBoxW
               moveX = x * glassBoxW / maskW

             */
            let moveX = x * _this.glassBox.clientWidth / _this.mask.clientWidth
            let moveY = y * _this.glassBox.clientHeight / _this.mask.clientHeight


            _this.bigPic.style.left = -moveX + 'px'
            _this.bigPic.style.top = -moveY + 'px'
        })

        this.showBox.addEventListener('mouseover', function (e) {
            _this.mask.style.display = 'block'
            _this.setScale() //遮罩层显示时计算宽高
        })
        this.showBox.addEventListener('mouseout', function (e) {
            _this.mask.style.display = 'none'
        })
    }

    /**
     * 切换
     *   1.设置选中效果 active
     *   2. 遍历所有选项，绑定事件
     *       2.1 清除所有选项样式
     *       2.2 当前选项设置样式
     */
    onTab() {
        let showBoxImg = this.showBox.querySelector('img')
        let _this = this
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].onmouseover = function () {
                _this.onClear()
                this.classList.add('active')
                //更改显示showbox和背景图片bigpic
                showBoxImg.setAttribute('src', `./image/show_${i+1}.jpg`)
                _this.bigPic.setAttribute('src', `./image/big_${i+1}.jpg`)
            }
        }
    }
    onClear() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].classList.remove('active')
        }
    }
}