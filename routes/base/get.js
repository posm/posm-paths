'use strict';

module.exports = {
    method: 'GET',
    path: '/base',
    config: {
        handler: require('../../handlers/base').get
    }
}