"use strict";

const express = require(`express`);
const chalk = require(`chalk`);

const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const mainRouter = require(`./routes/main`);

const PORT = 8080;
const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.listen(PORT, () => console.log(chalk.green(`Сервер запущен на порту ${PORT}`)));

