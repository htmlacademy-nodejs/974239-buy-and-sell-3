"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const offerValidator = require(`../middlewares/offerValidator`);
const commentValidator = require(`../middlewares/commentValidator`);
const offerExist = require(`../middlewares/offerExist`);
const commentExist = require(`../middlewares/commentExist`);
const route = new Router();

module.exports = (app, offersService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offersService.findAll();
    return res.status(HttpCode.OK).send(offers);
  });

  route.get(`/:offerId`, offerExist(offersService), (req, res) => {
    const {offer} = res.locals;

    return res.status(HttpCode.OK).json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offersService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, [offerExist(offersService), offerValidator], (req, res) => {
    const newOffer = req.body;
    const {offerId} = req.params;

    const updatedOffer = offersService.update(offerId, newOffer);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });

  route.delete(`/:offerId`, offerExist(offersService), (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offersService.drop(offerId);

    return res.status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExist(offersService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, [offerExist(offersService), commentExist(offersService, commentService)], (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;

    const deletedComment = commentService.drop(commentId, offer);

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExist(offersService), commentValidator], (req, res) => {
    const {offer} = res.locals;

    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.OK)
      .json(comment);
  });
};
