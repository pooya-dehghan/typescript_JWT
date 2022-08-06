import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  phonenumber: string;
}

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.get('authorization');
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: 'token not found' });
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, 'accessToken') as JwtPayload;
    return req.body.phonenumber === decoded.phonenumber; //here i found out how much ts is good ! :))
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: 'there was a problem' });
  }
}
