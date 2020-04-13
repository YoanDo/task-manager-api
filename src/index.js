const express = require('express')
require('./db/mongoose') //check if mongoose is connected
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //parse incoming json into object
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`)
})


