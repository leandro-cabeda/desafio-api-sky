module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'Bem vindo API Sky !' });
  });
};
