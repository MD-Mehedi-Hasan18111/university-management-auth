/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import path from 'path'

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
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})

export const logger2 = createLogger({
  level: 'info',
  format: combine(label({ label: 'Info' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'info.log'),
      level: 'info',
    }),
  ],
})
