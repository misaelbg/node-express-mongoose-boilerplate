import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../../database/schemas/User';

userSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified or new
  if (!user.isModified('senha')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(process.env.SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash the password using salt
    bcrypt.hash(user.senha, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.senha = hash;

      next();
    });
  });

  // Set default as creation date
  this.lastLogin = this.createdAt;
});

userSchema.methods.checkPassword = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET);
};

module.exports = new mongoose.model('User', userSchema);