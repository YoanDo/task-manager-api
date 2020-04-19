const mongoose = require('mongoose');

const connectionUrl = process.env.MONGODB_URL

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

