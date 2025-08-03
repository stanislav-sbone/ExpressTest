import { NextFunction, Request, Response } from "express";
import { users } from "../data";


export const usersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body
    const findedEmail = users.find((user) => user.email === email);

    if (!findedEmail) {
        return next()
    } else {
        return res.status(400).json({message: "Пользователь с таким email уже существует"})
    }
}