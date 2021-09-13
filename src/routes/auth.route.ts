import { Router } from "express";
import { ifLogged, ifNotLogged } from "../utils/logged";
import { AuthController } from "../controllers";

const _route: Router = Router();

_route.all('/steam', ifNotLogged, AuthController.steam);
_route.get('/link', ifNotLogged, AuthController.link);
_route.post('/logout', ifLogged, AuthController.logout);
_route.get('/user', ifLogged, AuthController.user);

export default _route;