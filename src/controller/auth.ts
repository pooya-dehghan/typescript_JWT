import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import verifyRefresh from '../utils/verifyRefresh';

export function loginController(req: Request, res: Response) {
  const { phonenumber, password } = req.body;
  if (!phonenumber || !password) {
    return res.status(400).json({
      success: false,
      message: 'provide valid phonenumber and password',
    });
  }
  const jwtSignConfig = {
    phonenumber: phonenumber,
  };

  const accessToken = jwt.sign(
    jwtSignConfig,
    'somesecrettokengeneratedbykiaprogramminggroup',
    {
      expiresIn: '30s',
    }
  );
  const refreshToken = jwt.sign(
    jwtSignConfig,
    'somesecrettokengeneratedbykiaprogramminggroup',
    {
      expiresIn: '30m',
    }
  );
  if (phonenumber === '09152189504' && password === 'kashmar552') {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
    });
    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  }
}

export function refreshController(req: Request, res: Response) {
  const { phonenumber, refreshToken } = req.body;
  const isValid = verifyRefresh(phonenumber, refreshToken);
  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: 'invalidtoken,trylogin again' });
  }
  const accessToken = jwt.sign(
    { phonenumber: phonenumber },
    'somesecrettokengeneratedbykiaprogramminggroup',
    { expiresIn: '30s' }
  );
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 900000),
  });
  return res.status(200).json({ success: true, accessToken });
}
