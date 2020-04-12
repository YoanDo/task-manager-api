//CRUD


const { MongoClient, ObjectID } = require('mongodb')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useUnifiedTopology: true}, (error, client) => {
  if(error) return console.log('Unable to connect to DB')

  console.log('Connected 🤖')
  const db = client.db(databaseName)

  db.collection('users').deleteOne({
    name: 'Trump'
  })
  .then((results) => console.log(results))
  .catch((error) => console.log(error))
  .finally(console.log('Done'))

})

