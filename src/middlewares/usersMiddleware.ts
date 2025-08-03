import { NextFunction, Request, Response } from "express";
import { users } from "../data";
import pool from "../db";



export const usersMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body
    const findedEmail = await pool.query("select * from users where email = $1", [email])
    if (!findedEmail.rows.length) {
        return next()
    } else {
        return res.status(400).json({message: "Пользователь с таким email уже существует"})
    }
}