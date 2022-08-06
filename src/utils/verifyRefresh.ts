import jwt from 'jsonwebtoken';
interface JwtPayload {
  phonenumber: string;
}

export default function verifyRefresh(phonenumber: string, token: string) {
  try {
    const decoded = jwt.verify(
      token,
      'somesecrettokengeneratedbykiaprogramminggroup'
    ) as JwtPayload;
    return decoded.phonenumber === phonenumber;
  } catch {
    return false;
  }
}
