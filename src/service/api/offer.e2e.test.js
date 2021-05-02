"use strict";

const express = require(`express`);
const request = require(`supertest`);
const offerInit = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comments`);
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

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offerInit(app, new OfferService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "jCwojH"`, () => expect(response.body[0].id).toBe(`jCwojH`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/jCwojH`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Продаю свою дружбу"`, () => expect(response.body.title).toBe(`Продаю свою дружбу`));

});

describe(`API creates an offer if data is valid`, () => {

  // ВОТ ТУТ СОЗДАЕТСЯ ОБЪЯВЛЕНИЕ
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф 1`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф 2`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  // ПО ИДЕЕ ЭТОТ ТЕСТ ДОЛЖЕН СРАБОТАТЬ
  // Но в реальности после предыдщего теста сюда попадет созданное объявление и длина будет 6

  test(`Offers count have not changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(5)));
});

describe.skip(`API changes existent offer`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф 3`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/7_WWI5`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/7_WWI5`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );
});

describe.skip(`API refuses to update an offer if data is invalid`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф 4`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(validOffer)) {
      const badOffer = {...validOffer};
      delete badOffer[key];
      await request(app)
        .put(`/offers/uX3Qr0`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe.skip(`Status 404 if update an offer with a wrong id`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф 5`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  test(`Response code is 404`, () => {
    return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
  });
});

describe.skip(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/jCwojH`);
    const allOffers = await request(app)
      .get(`/offers`);
    console.log(`allOffers:: `, allOffers.body);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`jCwojH`));

  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => {
      // console.log(`res.body:: `, res.body);
      expect(res.body.length).toBe(4);
    })
  );

});

test.skip(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
