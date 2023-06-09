import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'
import { verifyToken } from '../helpers/jwtHelper'
import config from '../config'
import { Secret } from 'jsonwebtoken'

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Your are not authorized')
      }

      let verifiedUser = null
      // verify token
      verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret)

      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
