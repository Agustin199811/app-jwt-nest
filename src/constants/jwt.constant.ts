import * as dotenv from 'dotenv';

dotenv.config()
export const JwtConstant = {
    secret: process.env.JWT_TOKEN,
}