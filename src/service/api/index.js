"use strict";

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);
const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);
const category = require(`./category`);
const search = require(`./search`);
const offer = require(`./offer`);

const apiRouter = new Router();

(async () => {
  const mockData = await getMockData();

  category(apiRouter, new CategoryService(mockData));
  search(apiRouter, new SearchService(mockData));
  offer(apiRouter, new OfferService(mockData), new CommentService());
})();

module.exports = apiRouter;
