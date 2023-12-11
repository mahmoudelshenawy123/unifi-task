const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.JWT_SECRET;

  return jwt({
    secret,
    algorithms: ['HS256'],
    // isRevoked:isRevoked
  }).unless({
    path: [
      { url: /\/public(.*)/ },
    ],
  });
}

module.exports = authJwt;
