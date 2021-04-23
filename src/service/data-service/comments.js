"use strict";
const {nanoid} = require(`nanoid`);
const {NANO_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(offer) {
    return offer.comments;
  }

  findOne(id, offer) {
    return offer.comments.find((comment) => comment.id === id);
  }

  drop(id, offer) {
    const commentToDelete = offer.comments.find((comment) => comment.id === id);

    if (!commentToDelete) {
      return null;
    }

    offer.comments = offer.comments.filter((comment) => comment.id !== commentToDelete.id);

    return commentToDelete;
  }

  create(offer, comment) {

    const newComment = Object.assign({id: nanoid(NANO_ID_LENGTH)}, comment);
    offer.comments.push(newComment);

    return newComment;
  }
}

module.exports = CommentService;
