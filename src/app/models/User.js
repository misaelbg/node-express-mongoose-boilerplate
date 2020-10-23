import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../../database/schemas/User';

userSchema.pre('save', async function(next) {
  const user = this;

  // only hash the password if it has been modified or new
  if (!await user.isModified('senha')) {
    return next();
  }

  // generate a salt
  this.senha = await bcrypt.hash(this.senha, process.env.SALT_FACTOR || 8);

  // Set default as creation date
  this.lastLogin = this.createdAt;
});

userSchema.methods.checkPassword = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET);
};

userSchema.methods.updateLastLogin = async function() {
  await this.updateOne(
    { email: this.email }, 
    { $set: { lastLogin: Date.now() } }
  );
};

module.exports = new mongoose.model('User', userSchema);