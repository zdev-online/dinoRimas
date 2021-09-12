import { Router } from "express";
import { ifLogged } from "../utils/logged";
import AuthRouter from './auth.route';
import UserRouter from './user.route';
import ProductRouter from './products.route';

const _route: Router = Router();

_route.use('/auth', AuthRouter);
_route.use('/user', ifLogged, UserRouter);
_route.use('/stuff', ifLogged);
_route.use('/products', ifLogged, ProductRouter);


export default _route;