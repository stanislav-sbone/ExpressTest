import { Request, Response } from "express";
import { users } from "../data";
import pool from "../db";

export const getUsers = async (req: Request, res: Response) => {
  const users = await pool.query("SELECT * FROM users")
  res.json(users.rows)
}

export const getUserById = async (req: Request, res: Response) => {
  const userID = parseInt(req.params.id, 10);
  const user = await pool.query("select * from users where id = $1", [userID])

  if (!user.rows[0]) {
    res.status(404).json({ message: "Пользователь не найден" });
  }

  res.json(user.rows[0]);
}

export const createUser = async (req: Request, res: Response) => {
  const { name, username, email } = req.body;
  const newUser = await pool.query('INSERT INTO users (name, username, email) values ($1, $2, $3) RETURNING *', [name, username, email])
  res.json(newUser.rows[0])
}

export const updateUser = async (req: Request, res: Response) => {
  const userID = parseInt(req.params.id, 10);
  const user = await pool.query("select * from users where id = $1", [userID])

  if (!user.rows[0]) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  const { name, username, email } = req.body;
  await pool.query("UPDATE users set name = $1, username = $2, email = $3 where id = $4 RETURNING *", [name, username, email, userID])

  res.json({ message: "Данные пользователя изменены" });
};

export const removeUser = async (req: Request, res: Response) => {
  const userID = parseInt(req.params.id, 10);
  const user = await pool.query("select * from users where id = $1", [userID])

  if (!user.rows[0]) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  await pool.query("DELETE FROM users where id = $1", [userID])
  res.json({ message: `Пользователь удален` });
};
