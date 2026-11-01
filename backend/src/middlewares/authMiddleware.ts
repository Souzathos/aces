import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/TokenUtils";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2) {
        return res.status(400).json({
            message: "Token is malformed"
        })
    }

    const [ schema, token ] = parts;

    if(schema !== "Bearer") {
        return res.status(401).json({
            message: "Token format is invalid"
        })
    }

    const decode = verifyToken(token);

    if(!decode) {
        return res.status(401).json({
            message: "Token is invalid or expired"
        })
    }

    (req as any).user = decode;

    next()
}