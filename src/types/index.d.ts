import 'express';
import { AdminJwtPayload, ClientJwtPayload } from 'src/shared/providers/auth/AuthGuard';
declare global{
     namespace Express {
        interface Request {
            userData?: ClientJwtPayload | AdminJwtPayload
        }
    }
}