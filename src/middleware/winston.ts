import { createLogger, transports } from 'winston'

//define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: '././logs/info.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

//instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  transports: [new transports.File(options.file), new transports.Console(options.console)],
  exitOnError: false, //do not exit on handled exceptions
})

//create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write: function (message: string): void {
    //output will be picked up by both transports (file and console)
    logger.log({
      level: 'info',
      message,
    })
  },
}

export default logger
