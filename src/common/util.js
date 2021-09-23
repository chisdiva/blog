//日期格式化
export function format(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    }
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt
}

export function debounce(fn, delay) {
    let timer = null;
    //利用闭包，维护全局纯净
    return function(...args) {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    }
}

export function throttle(fn, delay) {
    let previous = 0;
    return function () {
        let now = +new Date();
        if(now - previous > delay) {
            fn.apply(this);
            previous = now;
        }
    }
}
