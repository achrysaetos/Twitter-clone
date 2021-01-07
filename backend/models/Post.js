const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId, // lets you reference documents in other collections
    ref: 'users' // tells mongoose which model to use during population
  }
})

module.exports = model('Post', postSchema)
