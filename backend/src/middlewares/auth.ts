import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config';
import UnauthorizedError from '../errors/unauthorized-error';
import { Console } from 'console';

// есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;



const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization;

  let payload: any
  try {
    payload = jwt.verify(token!, `${JWT_SECRET}`);

    const { _id } = payload

    req.user = _id;
    next();
  } catch (e) {

    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export default auth;
