import { Router } from "express";
import { ifLogged } from "../utils/logged";
import AuthRouter from './auth.route';
import UserRouter from './user.route';

const _route: Router = Router();

_route.use('/auth', AuthRouter);
_route.use('/user', ifLogged, UserRouter);
_route.use('/stuff', ifLogged);


export default _route;