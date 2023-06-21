import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import User from '../users/users.model'
import { ILoginCredential } from './auth.interface'
import config from '../../../config'
import {
  CreateAccessToken,
  CreateRefreshToken,
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
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  const refreshToken = CreateRefreshToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expries_in as string
  )

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    needPasswordChange: isUserExist.needPasswordChange,
  }
}
