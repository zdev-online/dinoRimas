import { Router } from "express";
import { ProductController } from "../controllers";

const _route: Router = Router();

_route.get('/', ProductController.get);
_route.post('/buy', ProductController.buy);

export default _route;