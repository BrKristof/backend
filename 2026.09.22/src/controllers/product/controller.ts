import type { Request, Response } from "express";
import data from "../../app/data/data.ts"
export const getProduct = (_req: Request, res: Response) => {
    res.send({
        data
    })
}

export const setProduct = (req: Request, res: Response) => {
    console.log(req.body)
    res.send(req.body)
}

