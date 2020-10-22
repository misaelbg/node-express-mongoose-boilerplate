import mongoose from 'mongoose';

const userObject = {
  nome: { type: String, required: true },
  senha: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
}

const options = {
  timestamps: {
    data_criacao: 'created_at',
    data_atualizacao: 'updated_at'
  }
}

module.exports = new mongoose.Schema(userObject, options);