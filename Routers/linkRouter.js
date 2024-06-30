import express from "express";

import LinksController from '../Controllers/linksController.js';


const LinkRouter = express.Router();

LinkRouter.get('/',LinksController.getList);
LinkRouter.get('/:id',LinksController.getById);
LinkRouter.post('/',LinksController.add);
LinkRouter.put("/:id",LinksController.update);
LinkRouter.delete('/:id',LinksController.delete);
LinkRouter.get('/:linkId/redirect', LinksController.redirectAndUpdate);
LinkRouter.get('/:linkId/clicks', LinksController.getClicksBySource);
export default LinkRouter;
