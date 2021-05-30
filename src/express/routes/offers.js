"use strict";

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);
const multer = require(`multer`);
const path = require(`path`);
const api = require(`../api`).getAPI();

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

const offersRouter = new Router();

offersRouter.post(`/add`,
    upload.single(`avatar`),
    async (req, res) => {

      const {body, file} = req;
      const offerData = {
        picture: file.filename,
        sum: body.price,
        type: body.action,
        description: body.comment,
        title: body[`ticket-name`],
        category: Array.isArray(body.category) ? body.category : [body.category],
      };

      try {
        await api.createOffer(offerData);
        res.redirect(`/my`);
      } catch (e) {
        res.redirect(`back`);
      }
    }
);

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, async (req, res) => res.render(`new-ticket`));
offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offers/ticket-edit`, {offer, categories});
});

offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = offersRouter;

