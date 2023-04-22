import jwt, { JwtPayload } from "jsonwebtoken";

export function generateToken(payload: object) {
  return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '1d' });
}

export function verifyToken(token: string) {

  return jwt.verify(token, process.env.SECRET_JWT);

}

