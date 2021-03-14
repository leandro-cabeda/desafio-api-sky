const moment = require('moment-timezone');

module.exports = (app) => {
  const User = app.models.user;

  const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ mensagem: 'Parametro inválido!' });

    const userStorage = await User.findOne({ _id: id }, {
      nome: 1, email: 1, telefones: 1, token: 1, ultimo_login: 1,
    });

    if (!userStorage) return res.status(400).json({ mensagem: 'Usuário não encontrado com esse Id' });

    if (userStorage.token !== req.headers.authorization.split(' ')[1]) return res.status(401).json({ mensagem: 'Não autorizado' });

    const dataTimeNow = moment();
    const difUltimoLogin = dataTimeNow.diff(userStorage.ultimo_login, 'minutes');

    if (difUltimoLogin > 30) return res.status(401).json({ mensagem: 'Sessão inválida' });

    userStorage.token = undefined;
    return res.status(200).json(userStorage);
  };

  return {
    getUser,
  };
};
