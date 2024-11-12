const logToFile = require('log-to-file');

module.exports = (logMessage) => {
    try {
        logToFile(`${logMessage}`, "output.log")
    } catch (error) {
        console.log(`\x1b[31m[Error] \x1b[32m"An error occurred while logging:"\n\x1b[0m${error}`)
    }
    console.log(`${logMessage}`)
}

