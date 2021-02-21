"use strict";

const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);

const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const mainRouter = require(`./routes/main`);

const PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(PORT, () => console.log(chalk.green(`Сервер запущен на порту ${PORT}`)));

