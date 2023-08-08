const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Пользователь',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Не правильная запись почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
