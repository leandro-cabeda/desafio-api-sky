module.exports = (app) => {
  app.use((req, res) => {
    res.status(404).json({ mensagem: 'Não foi possível encontrar a rota específica' });
  });
};
