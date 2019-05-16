'use strict'

// envs module for using the environment variables 
require('dotenv').config()

// 
var winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, label, printf } = winston.format;

// Define a "class" instance of log object
var logger;

// 
const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3d'
});


exports.initLog = function () {
    logger = winston.createLogger({
        level: process.env.LOG_LEVEL,
        format: combine(
            label({ label: 'jarvis' }),
            timestamp(),
            myFormat
        ),
        transports: [
            transport
          ]
    });

    // da capire 
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
}

exports.debug = function (message) {
    logger.debug(message);
}

exports.info = function (message) {
    logger.info(message);
}

exports.warn = function (message) {
    logger.warn(message);
}

exports.error = function (message) {
    console.log(message);
    logger.error(message);
}


