const mysql = require('mysql')
let instance = null

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tasks'
  })

connection.connect(err =>  {
    if(err) {
        console.log(err)
    }
})

class db {
    static getDB() {
        return instance ? instance : new db()
    }

    async getTask(task_name){ 
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM tasks WHERE task_name = "${task_name}"`, (err, rows) => {
                    if(err) {
                        reject(err)
                    }
                    resolve(rows)
                })
            })
            return response
        } catch(error) {
            console.log(error)
        }
    }

    async getData() {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM tasks', (err, rows) => {
                    if(err) {
                        reject(err)
                    }
                    resolve(rows)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async removeItem(name) {
        try {
            const response = await new Promise((resolve, reject) => {

                let query = `DELETE FROM tasks WHERE task_name = "${name}"`;
                connection.query(query, (err, rows) => {
                    if(err) {   
                        reject(err)
                    }
                    resolve(rows)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async addTask(task_name, d_start, d_complete, desc) {
        try {
            const response = await new Promise((resolve, reject) => {
                let query = `INSERT INTO tasks (task_name, date_started, complete_by, description, completed) VALUES ('${task_name}', '${d_start}', '${d_complete}', '${desc}', 0)`;
                connection.query(query, (err, rows) => {
                    if(err) {   
                        reject(err)
                    }
                    resolve(rows)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async editTask(tname, dstart, dfin, desc, oldname) {
        try {
            const response = await new Promise((resolve, reject) => {
                let query = `UPDATE tasks SET task_name = "${tname}", date_started = "${dstart}", complete_by = "${dfin}", description = "${desc}" WHERE task_name = "${oldname}"`
                console.log(query)
                connection.query(query, (err, rows) =>  {
                    if(err) {
                        reject(err)
                    }
                    resolve(rows)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = db