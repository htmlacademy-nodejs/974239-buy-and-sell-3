"use strict";

const express = require(`express`);
const chalk = require(`chalk`);
const {HttpCode} = require(`../../constants`);
const apiRouter = require(`../api`);
const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());

app.use(`/api`, apiRouter);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(port) {
    port = Number.parseInt(port, 10) || DEFAULT_PORT;
    app.listen(port, () => console.info(chalk.green(`Сервер запущен на порту ${port}`)));
  }
};
