import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  removeUser,
  updateUser,
} from "../controllers/userControllers";
import { usersMiddleware } from "../middlewares/usersMiddleware";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", usersMiddleware, createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", removeUser);

export default router;
