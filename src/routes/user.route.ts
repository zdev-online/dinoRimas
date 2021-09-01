import { Router } from "express";
import { UserContoller } from "../controllers";
import { dinoGetStandart, dinoPostStandart, editColorValidate, getDinos } from "../validators";

const _route: Router = Router();

_route.post('/eat', dinoPostStandart, UserContoller.eat);
_route.post('/drink', dinoPostStandart, UserContoller.drink);
_route.post('/edit-color', dinoPostStandart, editColorValidate, UserContoller.editColor);
_route.get('/get-dinos', getDinos, UserContoller.dinos);
_route.post('/add-dino', dinoPostStandart, UserContoller.dinos);
_route.post('/activate-dino', dinoPostStandart, UserContoller.dinos);

export default _route;