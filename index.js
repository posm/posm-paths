'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
});

const initServer = async () => { 
    await server.register(require('inert'));
    server.route(routes)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

initServer();