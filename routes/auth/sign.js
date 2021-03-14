module.exports = (app) => {
  const { signIn, signUp } = app.controllers.auth.sign;
  const { headerVerifyContent } = app.utils.utils;

  app.post('/auth/signIn', headerVerifyContent, signIn);

  app.post('/auth/signUp', headerVerifyContent, signUp);
};
