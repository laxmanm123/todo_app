const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const db = require('./db')
const dbService = require('./db')

router.get("/", (req, res) => {
    res.render('new_task.ejs')
})

router.post("/", (request, res) => {
      const db = dbService.getDB()
     db.addTask(request.body.tname, request.body.dstart, request.body.dfin, request.body.description)
     .then((response) => {
       console.log(response)
     })
    res.redirect('/tasks')
})

module.exports = router