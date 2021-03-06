"use strict";

const express = require(`express`);
const request = require(`supertest`);
const searchInit = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `jCwojH`,
    title: `Продаю свою дружбу`,
    picture: `item14.jpg`,
    description: `Бонусом отдам все аксессуары. Если найдёте дешевле — сброшу цену.`,
    type: `sale`,
    sum: 99686,
    category: [`Животные`, `Книги`, `Личное`, `Разное`],
    comments: [
      {
        id: `peHnao`,
        text: `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого Почему в таком ужасном состоянии?`
      },
      {
        id: `-D9bhH`,
        text: `А сколько игр в комплекте? Совсем немного... А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        id: `b4Bt0m`,
        text: `Оплата наличными или перевод на карту? А где блок питания? Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого А сколько игр в комплекте? Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Совсем немного... С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `HRhULD`,
        text: `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `TayGgy`,
        text: `А где блок питания? Совсем немного... Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    id: `ES0GzK`,
    title: `Продам отличную подборку фильмов на VHS`,
    picture: `item08.jpg`,
    description: `Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам.`,
    type: `sale`,
    sum: 96188,
    category: [`Личное`, `Журналы`, `Посуда`],
    comments: []
  },
  {
    id: `7_WWI5`,
    title: `Продам книги Стивена Кинга`,
    picture: `item01.jpg`,
    description: `Если найдёте дешевле — сброшу цену. Кажется, что это хрупкая вещь. Ведьмаку заплатите чеканой монетой Это настоящая находка для коллекционера! Две страницы заляпаны свежим кофе.`,
    type: `offer`,
    sum: 66484,
    category: [`Журналы`, `Разное`, `Животные`, `Хлам`, `Личное`, `Игры`],
    comments: [
      {
        id: `QLda19`,
        text: `А сколько игр в комплекте? Почему в таком ужасном состоянии? А где блок питания?`
      },
      {
        id: `fgL0zH`,
        text: `Неплохо, но дорого А где блок питания? Вы что?! В магазине дешевле. Совсем немного... А сколько игр в комплекте? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `s51lzC`,
        text: `А сколько игр в комплекте? Неплохо, но дорого Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Совсем немного... Оплата наличными или перевод на карту?`
      },
      {
        id: `QiG_Xy`,
        text: `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Неплохо, но дорого Оплата наличными или перевод на карту?`
      },
      {
        id: `jD2l8i`,
        text: `Почему в таком ужасном состоянии? А где блок питания?`
      }
    ]
  },
  {
    id: `uX3Qr0`,
    title: `Продам отличную подборку фильмов на VHS`,
    picture: `item14.jpg`,
    description: `Таких предложений больше нет! Мой дед не мог её сломать. Кому нужен этот новый телефон, если тут такое... Кажется, что это хрупкая вещь.`,
    type: `offer`,
    sum: 34449,
    category: [`Разное`, `Животные`, `Игры`],
    comments: []
  },
  {
    id: `8Jxv_e`,
    title: `Продам отличную подборку фильмов на VHS`,
    picture: `item10.jpg`,
    description: `Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю.`,
    type: `offer`,
    sum: 9816,
    category: [`Посуда`, `Разное`, `Книги`, `Хлам`, `Личное`, `Животные`],
    comments: [
      {
        id: `DF11Kg`,
        text: `Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `TLLchJ`,
        text: `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. А где блок питания?`
      },
      {
        id: `auBxbI`,
        text: `Неплохо, но дорого Совсем немного... Вы что?! В магазине дешевле. А сколько игр в комплекте? А где блок питания? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `9mAIDG`,
        text: `Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого Совсем немного... Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        id: `L9VZqa`,
        text: `А сколько игр в комплекте? С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
      },
      {
        id: `hypyyW`,
        text: `Оплата наличными или перевод на карту? Совсем немного... Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `mgeTek`,
        text: `Вы что?! В магазине дешевле. А сколько игр в комплекте? Совсем немного... С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Неплохо, но дорого`
      },
      {
        id: `MrWcKa`,
        text: `Совсем немного... А где блок питания? С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте? Неплохо, но дорого Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Оплата наличными или перевод на карту?`
      },
      {
        id: `sOKQMF`,
        text: `Оплата наличными или перевод на карту? Неплохо, но дорого А где блок питания? А сколько игр в комплекте? Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `zBbSCG`,
        text: `Неплохо, но дорого С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
      },
      {
        id: `tZBYO3`,
        text: `А где блок питания? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А сколько игр в комплекте? Оплата наличными или перевод на карту?`
      },
      {
        id: `YfeGpv`,
        text: `Вы что?! В магазине дешевле. А сколько игр в комплекте?`
      },
      {
        id: `aejwU5`,
        text: `А сколько игр в комплекте? Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Неплохо, но дорого А где блок питания?`
      },
      {
        id: `WRUJL2`,
        text: `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А сколько игр в комплекте? Неплохо, но дорого А где блок питания?`
      },
      {
        id: `ef0REu`,
        text: `Совсем немного... Почему в таком ужасном состоянии? А сколько игр в комплекте? Неплохо, но дорого Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? А где блок питания? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
searchInit(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
        .get(`/search`)
        .query({
          query: `Продаю свою дружбу`
        });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`jCwojH`));
});

test(`Empty array returned when nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect([])
);

describe(`API returns 400 when query is absent`, () => {
  test(`Status 400 when extra parameters`,
      () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`,
        query1: `Продам свою душу`
      })
      .expect(HttpCode.BAD_REQUEST)
  );
  test(`Status 400 when not enough parameters`,
      () => request(app)
      .get(`/search`)
      .query({})
      .expect(HttpCode.BAD_REQUEST)
  );
});
