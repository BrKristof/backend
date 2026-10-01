import type { Request, Response } from "express";

export const run = (_reg:Request, res:Response) => {
    res.json({
        message: "hello world"
    })
}