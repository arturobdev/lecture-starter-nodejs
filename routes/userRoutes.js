import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await userService.getAll();
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
    const data = await userService.search({ id: id });
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware
)

router.post("/", createUserValid, async (req, res, next) => {
  try {
    const body = req.body
    const data = await userService.create(body);
    res.data = data;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
},
  responseMiddleware,
)

router.patch("/:id", updateUserValid, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    const data = await userService.update(id, body);
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
    const data = await userService.delete(id);
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
