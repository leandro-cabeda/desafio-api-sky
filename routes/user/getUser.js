module.exports = (app) => {
  const { getUser } = app.controllers.user.getUser;
  const { authToken } = app.utils.utils;

  app.get('/user/:id', authToken, getUser);
};
