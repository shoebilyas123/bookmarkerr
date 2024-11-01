import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1) Getting token and check of it's there
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req?.cookies?.jwt) {
    token = req?.cookies?.jwt;
  }

  if (!token) {
    res.status(401).json({ message: 'Please log in to get access' });
    return;
  }

  // 2) Verify the jwt and get the user id.
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as jwt.JwtPayload;

  if (Date.now() < (decoded.exp as number)) {
    res.status(401).json({ message: 'Token expired. Please log in again.' });
    return;
  }
  // 3) Check if user still exists
  const currentUser = await User.findById((decoded as any).id);
  if (!currentUser) {
    res.status(404).json({ message: 'User not found. Please register' });
    return;
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  (req as any).user = currentUser;
  res.locals.user = currentUser;
  next();
}
