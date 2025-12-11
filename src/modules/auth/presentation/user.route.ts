import { Router } from "express";
import { validate } from "@common/middlewares/validation.middleware";
import { createUserSchema } from "../user.validator";
import { initUserModule } from "../user.module";
import { makeUserController } from "./user.controller";

const router = Router();

let initialized = false;
let controller: ReturnType<typeof makeUserController>;

async function ensureInit() {
  if (!initialized) {
    const handlers = await initUserModule();
    controller = makeUserController(handlers);
    initialized = true;
  }
}

router.post("/", validate(createUserSchema), async (req, res, next) => {
  await ensureInit();
  return controller.createUser(req, res, next);
});

router.get("/:id", async (req, res, next) => {
  await ensureInit();
  return controller.getUserById(req, res, next);
});

export default router;
