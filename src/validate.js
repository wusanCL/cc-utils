// 包含常用的类型验证和表单验证
const toString = Object.prototype.toString
const tagTester = function (name) {
    return function (target) {
        return toString.call(target) === '[object ' + name + ']'
    }
}

export const isFunction = tagTester('Function')
export const isBoolean = tagTester('Boolean')
export const isArray = Array.isArray
export const isObject = tagTester('Object')

export function getType (data){
    let reg = /\[object (\w+)\]/
    return toString.call(data).match(reg)[1]
}

// 支持判断字符串类型的数字
export function isNumber  (data){
    if(data == null)return false
    return !isNaN(Number(data))
}
// 是否是整数
export function isInteger (data){
    let reg = /\./
    return isNumber(data) && !reg.test(data.toString())
}
// 是否是正整数
export function isPositiveInteger (data){
    return isInteger(data) && data > 0
}

export default {
    isFunction,
    isArray,
    isObject,
    isNumber,
    isInteger,
    isPositiveInteger,
    getType
}
