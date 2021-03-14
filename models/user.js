const moment = require('moment-timezone');

module.exports = (app) => {
  const { mongoose } = app.database.database;

  const userSchema = mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
    telefones: [{
      numero: { type: String },
      ddd: { type: String },
    }],
    data_criacao: { type: Date, default: moment() },
    data_atualizacao: { type: Date, default: moment() },
    ultimo_login: { type: Date, default: moment() },
    token: { type: String },
  });

  return mongoose.model('User', userSchema);
};
