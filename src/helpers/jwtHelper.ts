import jwt, { Secret } from 'jsonwebtoken'

export const CreateAccessToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime })
  return token
}

export const CreateRefreshToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime })
  return token
}
