function MVVM (options) {
    this.$options = options
    var data = this._data = this.$options.data
    var me = this

    // 实现vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key){
        me.proxy(key)
    })
}

MVVM.prototype = {
    _proxy: function(key) {
        var me = this
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            // 当通过vm.xxx读取属性值时可调用，从data中获取对应的属性值返回，代理读操作
            get: function proxyGetter () {
                return me._data[key]
            },
            // 当通过vm.xxx = value时，value被保存到data中对应的属性上，代理写操作
            set: function proxySetter (value) {
                me._data[key] = value
            }
        })
    }
}