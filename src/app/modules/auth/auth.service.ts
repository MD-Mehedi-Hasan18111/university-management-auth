import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import User from '../users/users.model'
import { IChangePassword, ILoginCredential } from './auth.interface'
import config from '../../../config'
import {
  CreateAccessToken,
  CreateRefreshToken,
  verifyToken,
} from '../../../helpers/jwtHelper'
import { JwtPayload, Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  return {
    accessToken: newAccessToken,
  }
}

export const changePassword = async (
  userData: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload
  const user = new User()

  const isUserExist = await user.isUserExist(userData?.userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(oldPassword, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Old Password is incorrect')
  }

  // hashing password before saving
  const hashPassword = await bcrypt.hash(
    newPassword,
    config.bcrypt_password_salt as string
  )

  const updateContext = {
    password: hashPassword,
    needPasswordChange: false,
  }

  await User.findOneAndUpdate({ id: userData?.userId }, updateContext)
}
