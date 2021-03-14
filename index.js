const app = require('./server/server');
const env = require('./.env');

app.database.database.connect();

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta: ${env.PORT}`);
});
