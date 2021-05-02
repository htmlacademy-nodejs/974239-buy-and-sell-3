"use strict";

const {Router} = require(`express`);
const searchValidator = require(`../middlewares/searchValidator`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, searchValidator, (req, res) => {
    const offers = service.findByTitle(req.query.query);
    res.status(HttpCode.OK)
      .json(offers);
  });
};
