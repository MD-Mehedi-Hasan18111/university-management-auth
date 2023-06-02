import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger1, logger2 } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger2.info('Database Connected Successfully!')
    app.listen(config.port, () => {
      logger2.info(`App listening on port ${config.port}`)
    })
  } catch (err) {
    logger1.error(err)
  }
}

main()
