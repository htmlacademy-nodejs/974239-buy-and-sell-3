"use strict";

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findByTitle(title) {
    const offers = this._offers.filter((offer) => offer.title.includes(title));

    return offers;
  }
}

module.exports = SearchService;
