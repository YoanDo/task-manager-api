//CRUD


const { MongoClient, ObjectID } = require('mongodb')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useUnifiedTopology: true}, (error, client) => {
  if(error) return console.log('Unable to connect to DB')

  console.log('Connected 🤖')
  const db = client.db(databaseName)

  //find one
  // db.collection('users').findOne({ _id: new ObjectID('5e903ac70eab45dfa1142723')}, (error, result) => {
  //     if(error) return console.log('Unable to fetch ')
  //     console.log(result)
  //   }
  // )

  // render an array of result
  // db.collection('users').find({ age: 30 }).toArray((error, users) => {
  //   console.log(users)
  // })
  // render the number of results
  // db.collection('users').find({ age: 30 }).count((error, count) => {
  //   console.log(count)
  // })

  //find last tasks by id
  db.collection('tasks').findOne({ _id: new ObjectID('5e90339a4fbc6d9fa5d2ae63')}, (error, task) => {
    if(error) return console.log('Something went wrong')
    console.log(task)
  })
  //find all completed tasks
  db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    if (error) return console.log('Something went wrong')
    console.log(tasks)
  })
})

