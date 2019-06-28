function ajax (options) {
    options = options || {}

    options.dataType = options.dataType || 'text'
    options.data = options.data || {}
    options.type = options.type || 'GET'

    let xhr = new XMLHttpRequest()

    let arr = []
    for (let name in options.data) {
        arr.push(`${name}=${options.data[name]}`)
    }
    let strData = arr.join('&')

    if (options.type == 'post') {
        xhr.open('POST', options.url, true)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(strData)
    } else {
        xhr.open('GET', options.url+'?'+strData, true)
        xhr.send()
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                options.success && options.success(xhr.responseText)
            } else {
                options.error && options.error()
            }
        }
    }

}