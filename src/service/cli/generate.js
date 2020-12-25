"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, pad, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_DESCRIPTIONS_COUNT = 5;
const MAX_ELEMENTS_COOUNT = 1000;

const FILE_NAME = `mocks.json`;
const TITLES_PATH = `data/titles.txt`;
const DESCRIPTIONS_PATH = `data/descriptions.txt`;
const CATEGORIES_PATH = `data/categories.txt`;

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

const getSplitedFileContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = ({count, titles, descriptions, categories}) =>
  new Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: `item${pad(
        getRandomInt(PictureNumber.MIN, PictureNumber.MAX)
    )}.jpg`,
    description: shuffle(descriptions)
      .slice(0, getRandomInt(1, MAX_DESCRIPTIONS_COUNT))
      .join(` `),
    type: Object.values(OfferType)[
      getRandomInt(0, Object.values(OfferType).length - 1)
    ],
    sum: getRandomInt(OfferCost.MIN, OfferCost.MAX),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  }));

module.exports = {
  name: `--generate`,
  async run(count) {
    if (count > MAX_ELEMENTS_COOUNT) {
      console.error(chalk.red(`Не больше ${MAX_ELEMENTS_COOUNT} объявлений`));
      process.exit(ExitCode.FAIL);
    }
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await getSplitedFileContent(TITLES_PATH);
    const descriptions = await getSplitedFileContent(DESCRIPTIONS_PATH);
    const categories = await getSplitedFileContent(CATEGORIES_PATH);

    const content = JSON.stringify(generateOffers({count, titles, descriptions, categories}));
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
