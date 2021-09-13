import { Router } from "express";
import { PaymentController } from "../controllers";
import { Payments, User } from "../database";
import EnotIO from "../modules/EnotIO";
import { ifLogged } from "../utils/logged";
import { PaymentValidate } from "../validators";

const _route: Router = Router();

_route.post('/', ifLogged, PaymentValidate.create, PaymentController.create);
_route.post('/verify', EnotIO.paymentHandler(Payments, User));

export default _route;