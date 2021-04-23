"use strict";

const {HttpCode} = require(`../../constants`);

module.exports = (offerService, commentService) => (req, res, next) => {
  const {offerId, commentId} = req.params;
  const offer = offerService.findOne(offerId);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
  }

  const comment = commentService.findOne(commentId, offer);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND)
        .send(`Comment with ${commentId} not found`);
  }

  res.locals.offer = offer;
  res.locals.comment = comment;
  return next();
};
