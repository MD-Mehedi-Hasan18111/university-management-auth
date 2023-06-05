/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'

// Logs Custom format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return `[${label}] ${level}: ${message} - ${date.toDateString()} ${hour}:${min}:${sec}`
})

export const logger1 = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export const logger2 = createLogger({
  level: 'info',
  format: combine(label({ label: 'Info' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
