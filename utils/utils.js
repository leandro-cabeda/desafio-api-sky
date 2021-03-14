const jwt = require('jsonwebtoken');
const secret = require('../.env').SECRET;

module.exports = () => {
  const authToken = (req, res, next) => {
    const auth = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;

    if (auth) {
      jwt.verify(auth, secret, (err) => {
        if (err) {
          res
            .status(401)
            .json({ mensagem: 'Token inválido, precisa realizar a autenticação novamente!' });
        } else {
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ mensagem: 'Não autorizado' });
    }
  };

  const createToken = (data) => {
    const token = jwt.sign(
      {
        email: data.email,
        senha: data.senha,
      },
      secret,
      {
        expiresIn: 2700,
      },
    );

    return token;
  };

  const headerVerifyContent = (req, res, next) => {
    if (!req.is('application/json')) return res.status(400).json({ mensagem: 'Tipo de application inválido! Só aceito estrutura JSON' });

    return next();
  };

  return {
    authToken,
    createToken,
    headerVerifyContent,
  };
};
