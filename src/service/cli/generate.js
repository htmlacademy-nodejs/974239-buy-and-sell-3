"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, pad, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_DESCRIPTIONS_COUNT = 5;
const MAX_ELEMENTS_COOUNT = 1000;

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const DESCRIPTIONS = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const CATEGORIES = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const OfferCost = {
  MIN: 1000,
  MAX: 100000,
};

const PictureNumber = {
  MIN: 1,
  MAX: 16,
};

const generateOffers = (count) =>
  new Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: `item${pad(
        getRandomInt(PictureNumber.MIN, PictureNumber.MAX)
    )}.jpg`,
    description: shuffle(DESCRIPTIONS)
      .slice(0, getRandomInt(1, MAX_DESCRIPTIONS_COUNT))
      .join(` `),
    type: Object.values(OfferType)[
      getRandomInt(0, Object.values(OfferType).length - 1)
    ],
    sum: getRandomInt(OfferCost.MIN, OfferCost.MAX),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
  }));

module.exports = {
  name: `--generate`,
  async run(count) {
    if (count > MAX_ELEMENTS_COOUNT) {
      console.error(chalk.red(`Не больше ${MAX_ELEMENTS_COOUNT} объявлений`));
      process.exit(ExitCode.FAIL);
    }
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(count));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.FAIL);
    }
  },
};
