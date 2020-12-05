"use strict";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * i);
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
};

const pad = (num) => (num < 10 ? `0${num}` : String(num));

module.exports = {
  getRandomInt,
  shuffle,
  pad,
};
