const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PostSchema = new Schema({
  title: String,
  content: String,
  author: 
    {
      id: String,
      name: String
    }
});

module.exports = mongoose.model('Post', PostSchema);