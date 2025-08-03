import { Router } from "express";
import {
  changeUser,
  createUser,
  getUsers,
  getUsersById,
  removeUser,
} from "../controllers/userControllers";
import { usersMiddleware } from "../middlewares/usersMiddleware";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.post("/users", usersMiddleware, createUser);
router.put("/users/:id", changeUser);
router.delete("/users/:id", removeUser);

export default router;
