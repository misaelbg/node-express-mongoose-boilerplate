import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  senha: { 
    type: String, 
    required: true 
  },
  lastLogin: {
    type: Date, 
    required: true, 
    default: Date.now 
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  telefones: [{
    numero: String,
    ddd: String
  }]
});

userSchema.set('timestamps', true);

module.exports = userSchema;