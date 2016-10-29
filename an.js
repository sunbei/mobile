/**
 * Created by Administrator on 2016/9/11/011.
 */
/**
 * 动画
 * @param ele 要运动的元素
 * @param target 要运动的终点后的效果
 * @param duration 在多长时间内完成运动
 * @param callback 运动结束之后要执行的函数
 */
function animate(ele, target, duration, callback) {
    var effectLinear = function (t, b, c, d) {
        return b + t / d * c;//运动到哪里
    };
    var time = 0;
    var begin = {};
    var change = {};
    for (var key in target) {
        begin[key] = utils.css(ele, key);
        change[key] = target[key] - begin[key];
    }
    var interval = 10;
    ele.timer && window.clearInterval(ele.timer);//只要运动的元素有自定义属性保存着定时器，
    // 那么在下一次执行的时候，一定要把上一次的定时器清掉，无论是否已经到达终点
    ele.timer = window.setInterval(function () {
        time += interval;
        if (time >= duration) {//到达终点传入回调函数
            window.clearInterval(ele.timer);
            utils.css(ele, target);
            if (typeof callback == "function") {//参数传进来的是一个函数
                callback.call(ele);//把回调函数中的this修改为运行的那个元素
            }
            return;
        }
        for (var key in change) {
            if (change[key]) {
                var val = effectLinear(time, begin[key], change[key], duration);
                utils.css(ele, key, val);
            }
        }

    }, interval);
}

