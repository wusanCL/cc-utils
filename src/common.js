// 包含防抖、节流、日期格式化等常用函数
const vaildate = require("./validate")

const { getType, isBoolean, isObject, isArray } = vaildate

// 拷贝   最少传入一个需要拷贝的源数据参数
export function clone (target, source, deep = false) {
    let paramsLength = arguments.length
    if (paramsLength < 3) {
        source = target
        //默认空对象，如果在浏览器环境下会根据你传入的source来决定target的数据类型
        target = window ? new windwo[getType(source)]() : {}
        if (paramsLength === 2 && isBoolean(arguments[1])) deep = arguments[1]
    }

    if (isArray(source) && !isObject(source)) return source

    let iteratee = function (target, source, deep) {
        let keys = isObject(source) && Object.keys(source)
        let i = 0
        let length = keys ? keys.length : source.length

        for (i; i < length; i++) {
            let key = keys ? keys[i] : i
            let value = source[key]
            let isArr
            if (deep && (isObject(value) || (isArr = isArray(value)))) {
                target[key] = isArr ? [] : {}
                iteratee(target[key], value, true)
            } else {
                target[key] = value
            }
        }
        return target
    }

    return iteratee(target, source, deep)
}

// 对象扩展合并
export function extend (...args) {
    let target = args[0] || {},
        i = 1,
        length = args.length

    let deep, isarray, clone
    if (isBoolean(target)) {
        deep = target
        target = args[1] || {}
        i = 2
    }

    for (; i < length; i++) {
        let data = args[i]
        if (isObject(data)) {
            for (let key in data) {
                let value = data[key],
                    src = target[key]
                if (deep && (isObject(value) || (isarray = isArray(value)))) {
                    if (isarray) {
                        clone = src && isArray(src) ? src : []
                    } else {
                        clone = src && isObject(src) ? src : {}
                    }
                    target[key] = extend(deep, clone, value)
                } else {
                    target[key] = value
                }
            }
        }
    }

    return target
}

// 防抖
export function debounce (func, wait, immediate) {
    let timeout, args
    let later = function () {
        timeout = null
        func.apply(null, args)
    }
    return function () {
        if (timeout) clearTimeout(timeout)
        args = arguments
        if (immediate) {
            if (!timeout) func.apply(null, args)
        }
        timeout = setTimeout(later, wait)
    }
}

// 节流
export function throttle (func, wait = 1000, options) {
    //leading   是否初次调用  默认开启，   traniling  是否最后一次调用  默认开启
    let lasttime = 0,
        timeout,
        args

    if (!options) {
        options = {}
    }
    let later = function (context) {
        timeout = null
        lasttime = options.leading === false ? 0 : _now()
        func.apply(context, args)
    }
    return function () {
        let now = Date.now()
        args = arguments

        if (!lasttime && options.leading === false) {
            lasttime = now
        }
        let remaining = wait - (now - lasttime)
        if (remaining <= 0) {
            lasttime = now
            func.apply(this, args)
        } else if (!timeout && options.traniling !== false) {
            timeout = setTimeout(later(this), remaining)
        }
    }
}

export default {
    clone,
    throttle,
    debounce,
    extend
}