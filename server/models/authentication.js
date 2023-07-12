const mongoose = require("mongoose");

const AuthenticationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const AuthenticationModel = mongoose.model(
  "authentication",
  AuthenticationSchema
);
module.exports = AuthenticationModel;
