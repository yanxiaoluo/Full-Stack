const express = require('express');
const mysql = require('mysql');
const pathLib = require('path');

const db = mysql.createPool({ host: '192.168.1.70', user: 'root', password: '12345678', database: 'blog' })

var router = express.Router();

router.get('/', (req, res) => {
    switch (req.query.act) {
        case 'mod':
            db.query(`SELECT * FROM custom_table WHERE id=${req.query.id}`, (err, data) => {
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
                            res.render('admin/bannners.ejs', {banners, mod_data: data[0]})
                        }
                    })
                }
            })
            break;
        case 'del':
            db.query(`DELETE FROM custom_table WHERE ID=${req.query.id}`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else {
                    if (data.length == 0) {
                        console.error(err)
                        res.status(404).send('no this custom').end()
                    } else {
                        false.unlink('../www/upload/'+data[0].src, err => {
                            if (err) {
                                console.error(err)
                                res.status(500).send('database error').end()
                            } else {
                                res.redirect('/admin/custom')
                            }
                        })
                    }
                    res.render('admin/bannners.ejs')
                }
            })
            break;
        default:
            db.query(`SELECT * FROM custom_table`, (err, data) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('database error').end()
                } else {
                    res.render('admin/custom.ejs', {data})
                }
            })
            break;
    }
    
})

router.post('/', (req, res) => {
    let {title, description, src} = req.body

    let ext = pathLib.parse(req.files[0].originalname).ext
    let oldPath = req.files[0].path
    let newPath = req.files[0].path+ext

    let newFileName = req.files[0].filename+ext

    false.rename(oldPath, newPath, err => {
        if (err) {
            res.status(500).send('file operation error').end()
        } else {
            if (req.body.mod_id) {
                db.query(`UPDATE custom_table SET title='${title}',description='${req.body.description}',title='${newFileName}' WHERE ID=${req.body.mod_id}`, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('database error').end()
                    } else {
                        res.redirect('admin/custom')
                    }
                })
            } else {
                db.query(`INSERT INTO custom_table (title, description, src) VALUES('${title}', '${description}', '${src}')`, (err, data) => {
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
})

module.exports = router