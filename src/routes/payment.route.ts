import { Router } from "express";
import { PaymentController } from "../controllers";
import { Payments, User } from "../database";
import EnotIO from "../modules/EnotIO";

const _route: Router = Router();

_route.post('/', PaymentController.create);
_route.post('/verify', EnotIO.paymentHandler(Payments, User));

export default _route;