import express from 'express'
import { makeChannelPayment, makeScanPayment } from '../controllers/paymentControllers.ts';

const paymentRoute = express.Router();

paymentRoute.patch("/channel/:id", makeChannelPayment)
paymentRoute.patch("/scan/:id", makeScanPayment)

export default paymentRoute;