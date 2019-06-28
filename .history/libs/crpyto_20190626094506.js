const crpyto = require('crypto')

module.exports = {
    MD5_SUFFIX: 'NSJnkjsjdNKJK38$gf*sghuisireHIUSJD#$DFJO2334VDHS',
    md5: function(str) {
        let obj = crpyto.createHash('md5')
        obj.update(str)
        return obj.digest('hex')
    }
}
