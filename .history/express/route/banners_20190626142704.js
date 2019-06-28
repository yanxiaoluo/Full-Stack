const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({ host: '192.168.1.70', user: 'root', password: '12345678', database: 'blog' })

var router = express.Router();

router.get('/banners', (req, res) => {
    switch (req.query.act) {
        case 'mod':
            db.query(`SELECT * FROM bannner_table WHERE id=${req.query.ID}`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else if (data.length == 0) {
                    res.status(400).send('data not found').end()
                } else {
                    db.query(`SELECT * FROM bannner_table`, (err, banners) => {
                        if (err) {
                            console.error(err)
                            res.status(500).send('database error').end()
                        } else {
                            res.render('admin/bannners', {banners, mod_data: data[0]})
                        }
                    })
                }
            })
            break;
        case 'del':
            db.query(`DELETE FROM bannner_table WHERE ID=${req.query.ID}`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else {
                    res.render('admin/bannners')
                }
            })
            break;
        default:
            db.query(`SELECT * FROM bannner_table`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else {
                    res.render('admin/bannners', {data})
                }
            })
            break;
    }
    
})
router.post('/banners', (req, res) => {
    let {title, description, href} = req.body

    if (!title || !description || !href) {
        res.status(400).send('arg error').end()
    } else {
        if (req.body.mod_id) {
            db.query(`UPDATE banner_table SET title='${req.body.title}',description='${req.body.description}',title='${req.body.href}' WHERE ID=${req.body.mod_id}`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else {
                    res.redirect('admin/bannners')
                }
            })
        } else {
            db.query(`INSERT INTO banner_table (title, description, href) VALUES('${title}', '${description}', '${href}')`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else {
                    res.redirect('admin/bannners')
                }
            })
        }
    }
})

module.exports = router