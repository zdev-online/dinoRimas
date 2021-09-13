import { Router } from "express";
import { UserController } from "../controllers";
import { UserValidate } from "../validators";

const _route: Router = Router();

_route.post('/eat', UserValidate.dinoPostStandart, UserController.eat);
_route.post('/drink', UserValidate.dinoPostStandart, UserController.drink);
_route.post('/edit-color', [...UserValidate.dinoPostStandart, ...UserValidate.editColorValidate], UserController.editColor);
_route.get('/get-dinos', UserValidate.getDinos, UserController.dinos);
_route.post('/add-dino', UserValidate.dinoPostStandart, UserController.dinos);
_route.post('/activate-dino', UserValidate.dinoPostStandart, UserController.dinos);

export default _route;