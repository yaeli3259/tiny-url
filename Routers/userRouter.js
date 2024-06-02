import express from "express";

import UsersController from '../Controllers/usersController.js';


const UserRouter = express.Router();

UserRouter.get('/',UsersController.getList);
UserRouter.get('/:id',UsersController.getById);
UserRouter.post('/',UsersController.add);
UserRouter.put('/:id',UsersController.update);
UserRouter.delete('/:id',UsersController.delete);
UserRouter.post('/:id/links', UsersController.addLink); 
UserRouter.get('/:id/links', UsersController.getLinks);
UserRouter.delete('/:id/links/:linkId', UsersController.deleteLink);
UserRouter.put('/:id/links/:linkId', UsersController.updateLink);
export default UserRouter;