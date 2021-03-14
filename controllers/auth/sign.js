const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const salt = require('../../.env').SALT;

module.exports = (app) => {
  const { createToken } = app.utils.utils;
  const User = app.models.user;

  const signUp = async (req, res) => {
    const { body } = req;
    if (!body || !body.nome || !body.email || !body.senha || !body.telefones.length) return res.status(400).json({ mensagem: 'Parametros inválidos!' });

    body.email = body.email.toLowerCase();
    const userStorage = await User.findOne({ email: body.email });
    if (userStorage) return res.status(400).json({ mensagem: 'E-mail já existente' });

    body.token = createToken(body);
    const genSalt = bcrypt.genSaltSync(salt);
    body.senha = bcrypt.hashSync(body.senha, genSalt);
    const user = await User.create(body);

    req.headers.authorization = `Bearer ${user.token}`;
    user.senha = undefined;
    return res.status(200).json(user);
  };

  const signIn = async (req, res) => {
    const { body } = req;
    if (!body || !body.email || !body.senha) return res.status(400).json({ mensagem: 'Parametros inválidos!' });

    body.email = body.email.toLowerCase();
    const userStorage = await User.findOne({ email: body.email });
    if (!userStorage) return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos"' });
    bcrypt.compare(body.senha, userStorage.senha, async (err, resp) => {
      if (err) return res.status(400).json({ mensagem: `Ocorreu seguinte erro: ${JSON.stringify(err)}` });

      if (resp) {
        const token = createToken(body);
        const { _id } = userStorage;
        const dataUser = {
          ultimo_login: moment(),
          token,
        };
        const user = await User.findOneAndUpdate({ _id }, dataUser, { new: true });

        req.headers.authorization = `Bearer ${user.token}`;
        user.senha = undefined;
        return res.status(200).json(user);
      }
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos"' });
    });
    return res;
  };

  return {
    signUp,
    signIn,
  };
};
