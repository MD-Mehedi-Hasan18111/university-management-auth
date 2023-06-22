import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import User from '../users/users.model'
import { ILoginCredential } from './auth.interface'
import config from '../../../config'
import {
  CreateAccessToken,
  CreateRefreshToken,
  verifyToken,
} from '../../../helpers/jwtHelper'
import { Secret } from 'jsonwebtoken'

export const loginUser = async (payload: ILoginCredential) => {
  const { id, password } = payload
  const user = new User()

  const isUserExist = await user.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect')
  }

  // create access token & refresh token
  const accessToken = CreateAccessToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  const refreshToken = CreateRefreshToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expries_in as string
  )

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    needPasswordChange: isUserExist.needPasswordChange,
  }
}

export const getRefreshToken = async (token: string) => {
  let verifiedToken = null
  try {
    verifiedToken = verifyToken(token, config.jwt.jwt_refresh_secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  const user = new User()
  const isUserExist = await user.isUserExist(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // generate new access token
  const newAccessToken = CreateAccessToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  return {
    accessToken: newAccessToken,
  }
}
