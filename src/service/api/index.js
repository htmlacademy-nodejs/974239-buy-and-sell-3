"use strict";

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);
const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);
const categoryInit = require(`./category`);
const searchInit = require(`./search`);
const offerInit = require(`./offer`);

const apiRouter = new Router();

(async () => {
  const mockData = await getMockData();

  categoryInit(apiRouter, new CategoryService(mockData));
  searchInit(apiRouter, new SearchService(mockData));
  offerInit(apiRouter, new OfferService(mockData), new CommentService());
})();

module.exports = apiRouter;
