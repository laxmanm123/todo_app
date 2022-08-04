const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.get('/', (req, res) =>  {
    res.redirect('/tasks')
})

const taskRouter = require('./routes/tasks')
const newTaskRouter = require('./routes/new_task')
const editTaskRouter = require('./routes/edit_task')

app.use('/tasks', taskRouter)
app.use('/new', newTaskRouter)
app.use('/edit', editTaskRouter)

app.listen(3000)
