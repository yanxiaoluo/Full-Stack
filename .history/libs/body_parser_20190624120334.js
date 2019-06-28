const query = require('querystring')

module.exports = {
    data: () => {
        return (req, res, next) => {
            let str = ''
            req.on('data', (data) => {
                str += data
            })
            req.on('end', () => {
                req.body = query.parse(str)
                next()
            })
        }
    }
}