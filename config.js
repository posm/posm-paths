// enviroment specific constants
module.exports =  {
    PORT: process.env.port || 8765,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.API_URL || 'localhost'
}