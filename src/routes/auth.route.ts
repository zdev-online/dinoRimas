import { Router } from "express";
import { ifLogged, ifNotLogged } from "../utils/logged";
import { AuthContoller } from "../controllers";

const _route: Router = Router();

_route.all('/steam', ifNotLogged, AuthContoller.steam);
_route.get('/link', ifNotLogged, AuthContoller.link);
_route.post('/logout', ifLogged, AuthContoller.logout);
_route.get('/user', ifLogged, AuthContoller.user);

export default _route;