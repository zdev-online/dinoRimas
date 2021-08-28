import { Router } from "express";
import { UserContoller } from "../controllers";
import { actionValidate, editColorValidate } from "../validators";

const _route: Router = Router();

_route.post('/eat', actionValidate, UserContoller.eat);
_route.post('/drink', actionValidate, UserContoller.drink);
_route.post('/editColor', editColorValidate, UserContoller.editColor);

export default _route;