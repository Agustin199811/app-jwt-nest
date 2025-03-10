import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`[${req.method}] ${req.originalUrl} -  Request recived`);

        res.on('finish', () => {
            console.log(`Status code : ${res.statusCode}`);
        });

        next();
    }
}




