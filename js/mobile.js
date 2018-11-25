
$(function () {
    new Slider();
})
function Slider() {
    this.init();//
}
// 初始化
Slider.prototype.init = function () {
    this.banner = $('.banner');// 轮播图容器 装有左右按钮  图片盒子以及点容器
    this.width = this.banner.width();// 容器宽度
    this.img = this.banner.find('img');// img的数组（此处为创建之后的 即加了假第一张和假最后一张的数组）
    this.length = this.img.length;
    this.bannerWidth = this.length * 100 + '%';// 动态创建ul 的宽度
    this.imgBox = this.banner.find('ul');
    this.imgBox.css('width', this.bannerWidth);
    this.lis = this.imgBox.find('li');
    this.pointBox = $('.banner ol li')//点容器
    this.pointBox.parent().css('width', (this.length - 2) * 20 + 'px')// 20根据设置的li的宽度和右外边距设置
    this.imgWidth = 100 / this.length;// 计算每个图片宽度百分比
    this.lis.css('width', this.imgWidth + '%');
    this.index = 1;// 索引 
    this.imgBox.css('transform', 'translateX(-' + this.index * this.width + 'px)'); // 初始化的时候避开第一张假的图片
    this.transitionend();
    this.interval();
    this.handlerSlide();
}
// 滑动事件
Slider.prototype.handlerSlide = function () {
    var that = this;
    var startClientX = 0;
    this.banner.on('touchstart', function (e) {
        startClientX = e.originalEvent.changedTouches[0].clientX;
        clearInterval(that.timer);
    }).on('touchend', function (e) {
        var endClientX = e.originalEvent.changedTouches[0].clientX;
        var movelength = endClientX - startClientX;
        if (Math.abs(movelength) >= 50) {
            if (movelength > 0) {
                that.imgBox.css({ 'transform': 'translateX(-' + (that.index - 1) * +that.width + 'px)', 'transition': 'all .3s' });
                that.index--;
            } else {
                that.imgBox.css({ 'transform': 'translateX(-' + (that.index + 1) * +that.width + 'px)', 'transition': 'all .3s' });
                that.index++;
            }
        }
        that.timer = setInterval(function () {
            that.imgBox.css({ 'transform': 'translateX(-' + (that.index + 1) * +that.width + 'px)', 'transition': 'all .3s' });
            that.index++;
        }, 3000)
    })
}

// 点容器 事件
Slider.prototype.point = function () {
    this.pointBox.eq(this.index - 1).addClass('now').siblings().removeClass('now');
}
// transitionend 事件
Slider.prototype.transitionend = function () {
    var that = this;
    this.imgBox.on('transitionend', function () {
        if (that.index >= that.lis.length - 1) {
            that.imgBox.css({ 'transform': 'translateX(-' + 1 * +that.width + 'px)', 'transition': 'none' });
            that.index = 1;
        }
        if (that.index <= 0) {
            that.imgBox.css({ 'transform': 'translateX(-' + (that.lis.length - 2) * +that.width + 'px)', 'transition': 'none' });
            that.index = that.lis.length - 2;
        }
        that.point();
    });
}
// 定时器
Slider.prototype.interval = function () {
    var that = this;
    this.timer = setInterval(function () {
        that.imgBox.css({ 'transform': 'translateX(-' + (that.index + 1) * +that.width + 'px)', 'transition': 'all .3s' });
        that.index++;
    }, 3000)
}



























