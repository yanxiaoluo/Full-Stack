function ajax (options) {
    options = options || {}

    options.dataType = options.dataType || 'text'
    options.data = options.data || {}
    options.type = options.type || 'GET'

    let xhr = new XMLHttpRequest()

    let arr = []
    for (let name in options.data) {
        arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(options.data[name])}`)
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
                let data = xhr.responseText

                switch (options.dataType) {
                    case 'json':
                        if (window.JSON && JSON.parse)
                            data = JSON.parse(data)
                        else
                            data = eval('('+data+')')
                        break;
                    case 'xml':
                        data = xhr.responseXML
                        break;
                }
                
                options.success && options.success()
            } else {
                options.error && options.error()
            }
        }
    }

}