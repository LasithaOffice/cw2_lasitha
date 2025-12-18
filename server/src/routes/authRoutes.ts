import express from 'express'
import { signin } from '../controllers/authControllers.ts';

const authRoute = express.Router();

authRoute.post("/signin", signin)

export default authRoute;