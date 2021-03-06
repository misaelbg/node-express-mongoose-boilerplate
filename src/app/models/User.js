import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../../database/schemas/User';

/**
 * Check if the password has been changed and apply new encryption
 * Update the last login date with the creation date
 */
userSchema.pre('save', async function(next) {
  const user = this;

  // only hash the password if it has been modified or new
  if (!user.isModified('senha')) {
    return next();
  }

  // generate a salt
  this.senha = await bcrypt.hash(this.senha, process.env.SALT_FACTOR || 8);

  // Set default as creation date
  this.lastLogin = this.createdAt;
});

/**
 * Check if the password entered is correct
 * @param {String} senha - user password
 * @returns {Boolean}
 */
userSchema.methods.checkPassword = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

/**
 * Generate a new token with the current user id
 * @returns {String} - Json Web Token
 */
userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET);
};

/**
 * Update the User last login date
 * @returns {void}
 */
userSchema.methods.updateLastLoginTime = async function() {
  await this.updateOne({ lastLogin: Date.now() });
};

/**
 * Compare date-time with last login and return difference in minutes
 * @param {Date} date - Current time-date to compare
 * @returns {Number} - difference in minutes
 */
userSchema.methods.lastLoginBefore = function(date) {
  const lastLogin = new Date(this.lastLogin);
  let diff = (date.getTime() - lastLogin.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

module.exports = new mongoose.model('User', userSchema);