import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', UserRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

// Using Global Error Handler
app.use(globalErrorHandler)

export default app
