import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await fighterService.getAll();
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware
)

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await fighterService.search({ id: id });
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware
)

router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const body = req.body
    const data = await fighterService.create(body);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware,
)

router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    const data = await fighterService.update(id, body);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware
)

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await fighterService.delete(id);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware
)

export { router };
