import express from "express";

import LinksController from '../Controllers/linksController.js';


const LinkRouter = express.Router();

LinkRouter.get('/links/',LinksController.getList);
LinkRouter.get('/links/:id',LinksController.getById);
LinkRouter.post('/links/',LinksController.add);
LinkRouter.put("/links/:id",LinksController.update);
LinkRouter.delete('/links/:id',LinksController.delete);
LinkRouter.get('/:linkId/', LinksController.redirectAndUpdate);
LinkRouter.get('/links/:linkId/clicks', LinksController.getClicksBySource);
export default LinkRouter;
