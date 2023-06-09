import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { changePassword, getRefreshToken, loginUser } from './auth.service'
import config from '../../../config'

export const LoginUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await loginUser(data)

    // set refresh token into cookie
    const { refreshToken, ...others } = result
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: others,
    })
  } catch (error) {
    next(error)
  }
}

export const RefreshToken: RequestHandler = async (req, res, next) => {
  try {
    // set refresh token into cookie
    const { refreshToken } = req.cookies

    const result = await getRefreshToken(refreshToken)

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'refresh token getting successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const ChangePassword: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const user = req.user

    const result = await changePassword(user, data)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
