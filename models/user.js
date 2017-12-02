const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
  username: String,
  password: String,
  githubId: String,
  githubname:String,
  googleId: String,
  googlename:String,
  facebookId: String,
  facebookname:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);