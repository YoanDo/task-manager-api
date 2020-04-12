//CRUD


const { MongoClient, ObjectID } = require('mongodb')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useUnifiedTopology: true}, (error, client) => {
  if(error) return console.log('Unable to connect to DB')

  console.log('Connected 🤖')
  const db = client.db(databaseName)

  // //find last tasks by id
  // db.collection('tasks').findOne({ _id: new ObjectID('5e90339a4fbc6d9fa5d2ae63')}, (error, task) => {
  //   if(error) return console.log('Something went wrong')
  //   console.log(task)
  // })
  // //find all completed tasks
  // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
  //   if (error) return console.log('Something went wrong')
  //   console.log(tasks)
  // })

  // db.collection('users').updateOne({ _id: new ObjectID('5e902f7fd02ae87c3639842c')}, {
  //   // $set: {
  //   //   name: 'Yamcha'
  //   // }
  //   $inc:{
  //     age: 3
  //   }
  // }).then((result) => console.log('🥳 success:', result)).catch((error) => console.log(error))

  db.collection('tasks').updateMany({}, {
    $set:{
      completed: true
    }
  }).then((result) => console.log('🥳 success:', result)).catch((error) => console.log(error))

})

