import { Request, Response } from "express";
import { users } from "../data";

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUsersById = (req: Request, res: Response) => {
  const userID = parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === userID);

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
  }

  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { name, username, email } = req.body;
  const newUser = {
    id: Date.now(),
    name,
    username,
    email,
  };
  users.push(newUser);
  res.json({ message: "Пользователь создан" });
};

export const changeUser = (req: Request, res: Response) => {
  const userID = parseInt(req.params.id, 10);
  const index = users.findIndex((user) => user.id === userID);

  if (index === -1) {
    res.status(404).json({ message: "Пользователь не найден" });
    return;
  }

  const { name, username, email } = req.body;
  const newData = {
    ...users[index],
    name,
    username,
    email,
  };
  users[index] = newData;
  res.json({ message: "Данные пользователя изменены" });
};

export const removeUser = (req: Request, res: Response) => {
  const userID = parseInt(req.params.id, 10);
  const index = users.findIndex((user) => user.id === userID);

  if (index === -1) {
    res.status(404).json({ message: "Пользователь не найден" });
    return;
  }

  res.json({ message: `Пользователь ${users[index].name} удален` });
  users.splice(index, 1);
};
