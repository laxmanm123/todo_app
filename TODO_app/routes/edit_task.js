const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const dbService = require('./db')

var id 

router.route('/')
.get((req, res) => {
    const db = dbService.getDB()
    id = req.query.id
    db.getTask(req.query.id).then((response) => {
        res.render('edit_task.ejs', { data: JSON.parse(JSON.stringify(response))[0] })
    })
})
.post((req, res)  => {
    const db = dbService.getDB()
    db.editTask(req.body.tname, req.body.dstart, req.body.dfin, req.body.description, id)
    .then((response) =>  {
        console.log(response)
    })
    res.redirect('/tasks')
})


module.exports = router