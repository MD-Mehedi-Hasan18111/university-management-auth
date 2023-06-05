import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger1, logger2 } from './shared/logger'
import { Server } from 'http'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger2.info('Database Connected Successfully!')
    server = app.listen(config.port, () => {
      logger2.info(`App listening on port ${config.port}`)
    })
  } catch (err) {
    logger1.error(err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        logger1.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('uncaughtException', error => {
  logger1.error(error)
  process.exit(1)
})

process.on('SIGTERM', () => {
  logger2.info('SIGTERM is Received')
  if (server) {
    server.close()
  }
})
