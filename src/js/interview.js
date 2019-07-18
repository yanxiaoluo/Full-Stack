// ajax封装
function ajax (options) {
    options = options || {}

    options.type = options.type || 'GET'
    options.dataType = options.dataType || 'json'
    options.data = options.data || {}

    let xhr = new XMLHttpRequest()
    let arr = []
    for (let i = 0; i < options.data.length; i++) {
        arr.push(`${i}=${options.data[i]}`)
    }

    strData = arr.join('&')

    if (options.type == 'get') {
        xhr.open('POST', options.url, true)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(strData)
    } else {
        xhr.open('GET', `${options.url}?${strData}`, true)
        xhr.send()
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let data = xhr.responseText

                switch (options.dataType) {
                    case 'json':
                        if (window.JSON && JSON.parse) {
                            data = JSON.parse(data)
                        } else {
                            data = eval('('+data+')')
                        }
                        break;
                    case 'xml':
                        data = xhr.responseXML
                }
                options.success && options.success(data)
            } else {
                options.error && options.error()
            }
        }
    }
    
}

// 深浅拷贝
function deepClone (obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj == 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] == 'object') {
                    newObj[key] = deepClone(obj[key])
                } else {
                    newObj[key] = obj[key]
                }
            }
        }
    }
    return newObj
}

// 防抖函数
function debounce (fn, delay) {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(this)
        }, delay)
    }
}

// 节流函数
function throttle (fn, delay) {
    let lastTime = 0
    return function () {
        let nowTime = Date.now()
        if (nowTime - lastTime > delay) {
            fn.call(this)
            lastTime = nowTime
        }
    }
}

// 扁平化数组
function flattenArray (arr) {
    let newArr = []
    for (let i in arr) {
        if (!Array.isArray(arr[i])) {
            newArr.push(arr[i])
        } else {
            newArr = newArr.concat(flattenArray(arr[i]))
        }
    }
    return newArr
}

// 鸭式辩型
function checkIsArray (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]' && 'push' in arr
}

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(a => b.has(a)))
// set {2, 3}

// 差集
let intersect = new Set([...a].filter(a => !b.has(a)))

// 柯里化函数
function curry (fn) {
    return function () {
        // 备份实参
        let args = arguments
        return function () {
            return fn(...args, ...arguments)
        }
    }
}
