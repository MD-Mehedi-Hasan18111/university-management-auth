import config from '../../../config'
import { IUser } from './users.interface'
import User from './users.model'
import { generateUserId } from './users.utils'

export const createUser = async (userData: IUser): Promise<IUser | null> => {
  // Generate Password
  const id = await generateUserId()
  userData.id = id

  // Default password
  if (!userData.password) {
    userData.password = config.user_default_pass as string
  }

  const createdUser = await User.create(userData)
  if (!createdUser) {
    throw new Error('Failed to create user!')
  }
  return createdUser
}
