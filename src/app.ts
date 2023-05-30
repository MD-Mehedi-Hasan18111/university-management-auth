import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import userRoutes from './app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

export default app
