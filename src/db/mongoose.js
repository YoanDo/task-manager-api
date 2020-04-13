const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api' // connection + name of the db

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

