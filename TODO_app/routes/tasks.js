const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const dbService = require('./db')

router.route("/")
.get((req, res) => {
    const db = dbService.getDB()
    db.getData().then((data) => {
      res.render('tasks.ejs', { taskData: loadData(JSON.parse(JSON.stringify(data))) })
    })
})
.post((req, res) => {
  const db = dbService.getDB()
  db.removeItem(req.body.id).then((response) => {
    console.log(response)
  })
  res.redirect('/tasks')
})


module.exports = router

function loadData(data) {
    let dataHTML = '';
    for(let task of data) {
        dataHTML += `<tr><td>${task.task_name}</td><td>${task.date_started}</td><td>${task.complete_by}</td><td>${task.description}</td>`;
        dataHTML += `<td><form action="/edit"> <button name="id" value="${task.task_name}">Edit</button></form></td>`
        dataHTML += `<td><form action="/tasks" method="post"><button name="id" value="${task.task_name}">Delete</button></form></td></tr>`;
    }
    return dataHTML;
}   
