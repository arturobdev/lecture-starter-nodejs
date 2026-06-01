import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { createFightValid } from "../middlewares/fight.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await fightService.getAll();
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
    const data = await fightService.search({ id: id });
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware
)

router.post("/", async (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body
    const data = await fightService.fight(fighter1, fighter2);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware,
)

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await fightService.delete(id);
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
