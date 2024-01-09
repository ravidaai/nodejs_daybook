const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const redisClient = require("./init_redis");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1m", //5h
        issuer: "ravikazi.com.np",
        audience: userId.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          //reject(err)
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      //if there is no refresh token or expire
      // redisClient.GET(userId, (err, result) => {
      //   if (err) {
      //     console.log(err.message);
      //     reject(createError.Forbidden());
      //     return;
      //   }
      // });

      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "24h",
        issuer: "ravikazi.com.np",
        audience: userId.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }

        //expire in 1 year from now (default in second)
        //365 * 24 * 60 * 60
        redisClient.SET(userId.toString(), token, "EX", 24 * 60 * 60, (err, reply) => {
          if (err) {
            reject(createError.InternalServerError());
            return;
          }
          resolve(token);
        });
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    // console.log("verifyAccessToken / aud:",req.aud);
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        //it only return below fields if error
        /*
     err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
     }
  */
        // if (err.name === "TokenExpiredError") {
        //   return next(createError.Forbidden());
        // }

        const message =
          err.name === "TokenExpiredError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          //if (err) return reject(createError.Unauthorized());
          if (err) return reject(createError.Forbidden());
          const userId = payload.aud;
          redisClient.GET(userId, (err, result) => {
            if (err) {
              reject(createError.InternalServerError());
              return;
            }
            if (refreshToken === result) return resolve(userId);
            reject(createError.Unauthorized());
          });
        }
      );
    });
  },
};
