const crpyto = require('crypto')

module.exports = {
    md5: function(str) {
        let obj = crpyto.createHash('md5')
        obj.update(str)
        return obj.digest('hex')
    }
}
