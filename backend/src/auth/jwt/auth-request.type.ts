// External imports
import { Request } from 'express';

// Internal imports
import { JwtPayload } from '../jwt/jwt-payload.type';

export type AuthRequest = Request & {
  user: JwtPayload;
};
