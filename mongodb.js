//CRUD

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useUnifiedTopology: true}, (error, client) => {
  if(error) return console.log('Unable to connect to DB')

  console.log('Connected correctly')
  const db = client.db(databaseName)

  //INSERT ONE
  // db.collection('users').insertOne({
  //   name: 'Yo',
  //   age: 30
  // }, (error, result) => {
  //   if(error) return ((console.log('Unable to insert user')))

  //   console.log(result.ops)
  // })

  //INSERT MANY
  // db.collection('users').insertMany([
  //   {
  //     name: 'Hercule',
  //     age: 8
  //   },
  //   {
  //     name: 'Angela',
  //     age: 29
  //   }
  // ], (error, result) => {
  //   if(error) return console.log('Unable to insert document')
  //   console.log(result.ops)
  // })

  db.collection('tasks').insertMany([
    {
      description: 'Wake up',
      completed: true
    },{
      description: 'Gardening',
      completed: false
    },{
      description: 'Go to the grocery store',
      completed: false
    }
  ], (error, result) => {
      if (error) return console.log('Unable to insert document')
      console.log('Success -', result.ops)
  })
})
