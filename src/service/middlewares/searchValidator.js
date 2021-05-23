"use strict";
const {HttpCode} = require(`../../constants`);

const queryKeys = [`query`];

module.exports = (req, res, next) => {
  const keys = Object.keys(req.query);

  const keysExists = queryKeys.every((key) => keys.includes(key)) && keys.every((key) => queryKeys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
    return;
  }

  next();
};
