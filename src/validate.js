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


export function checkForm(data,initData = null,openDefaultValisdate = fase){
    if(!data && !isObject(data)){
        console.error('请传入一个对象')
        return false
    } 
    let isInit
    for(let key in data){
        let val = data[key]
        isInit = initData ? Object.prototype.hasOwnProperty.call(initData,key) : true
        if(isInit && (val === '' || val == null)){
            return {status:false,errTxt:'请完整输入表单'}
        }
        if(openDefaultValisdate && checkForm.defaultValidate[key]){
            return defaultValidate[key](val)
        }
    }

    return {status:true}
}


// 默认的表单字段验证函数 
checkForm.defaultValidate = {
    phone:(val) => {}
}

export default {
    isFunction,
    isArray,
    isObject,
    isNumber,
    isInteger,
    isPositiveInteger,
    getType,
    checkForm
}
