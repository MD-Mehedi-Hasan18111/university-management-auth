import { RequestHandler } from 'express'
import { createAcademicSemester } from './academicSemester.service'

export const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    console.log(data)
    const result = await createAcademicSemester(data)
    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
