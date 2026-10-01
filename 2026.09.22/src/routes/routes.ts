// Általános útvonalak, az app.ts a "/" alá csatolja
import { Router } from "express";
import {run} from "../controllers/run.ts";
const router :Router = Router()

router.get("/",run) // GET / -> run controller ("hello world")

export default router
