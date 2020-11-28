// 包含常用的类型验证和表单验证
const tagTester = function (name) {
    return function (target) {
        return toString.call(target) === '[object ' + name + ']'
    }
}

exports.isObject = tagTester('Object')
exports.isFunction = tagTester('Function')
exports.isBoolean = tagTester('Boolean')
exports.isArray = Array.isArray

exports.getType = function(data){
    let reg = /\[object (\w+)\]/
    return toString.call(data).match(reg)[1]
}

// 支持判断字符串类型的数字
exports.isNumber = function (data){
    if(data == null)return false
    return !isNaN(Number(data))
}
// 是否是整数
exports.isInteger = function(data){
    let reg = /\./
    return isNumber(data) && !reg.test(data.toString())
}
// 是否是正整数
exports.isPositiveInteger = function(data){
    return isInteger(data) && data > 0
}

