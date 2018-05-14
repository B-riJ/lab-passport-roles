const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role:     {type:String, enum: ['Boss', "Developer", "Intern"], default: "Intern"}
  
});

const User = mongoose.model("User", userSchema);

// synchs this file with other files, creates a line of communication
// using const user, model, userSchema
module.exports = User;

// const express = require('express');
// const router  = express.Router();

// const userSchema = new Schema({
//   username: String,
//   password: String, 

//   role: {
//     type: String,
//     enum : ['Boss', 'Developer', 'TA', 'Student'],
//     default : 'Student'
//   }
// }, {
//   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
// });

// const User = mongoose.model("User", userSchema);

// module.export.User