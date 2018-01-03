const express = require('express'),
    router = express.Router(),
    config = require('./../config/config');
var path = require('path'),
    proxy = require('express-http-proxy');

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, './../static/html/admin.html'))
});

router.get('/', (req, res) => {
    res.send('Welcome on the portal')
});

router.use('/', express.static('static'))

module.exports = router;