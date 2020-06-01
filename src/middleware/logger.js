import {createLogger, transports, format} from 'winston'

const logger = createLogger({
  transports:[
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
    }),
    new transports.File({
      filename: '././logs/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
})

// const logger = createLogger({
//   level: 'info',
//   format: format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     // - Write to all logs with level `info` and below to `combined.log`
//     // - Write all logs error (and below) to `error.log`.
//     new transports.File({ filename: 'error.log', level: 'error' }),
//     new transports.File({ filename: 'combined.log' })
//   ]
// })
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new transports.Console({
//     format: format.simple()
//   }))
// }

module.exports = logger