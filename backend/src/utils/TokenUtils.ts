import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

type Payload = {
    userId: number;
    email: string;
    role: string;
};

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EPIRES_IM = Number(process.env.JWT_EXPIRES_IN) || 86400;

export async function generateToken(payload: Payload) {
    const token = jwt.sign(payload, JWT_SECRET, { 
        expiresIn: JWT_EPIRES_IM 
    });

    return token;
}

export async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }   
}
