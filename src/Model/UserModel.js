const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', async function (next) {
    try {
      /* 
      Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
      */
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
    } catch (error) {
      next(error)
    }
  })
  
  userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error //since it is not middleware
    }
  }

module.exports = mongoose.model('UserModel', userSchema);