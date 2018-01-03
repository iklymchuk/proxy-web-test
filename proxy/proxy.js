var path = require('path'),
    express = require('express'),
    https = require('https'),
    fs = require('fs'),
    exphbs = require('express-handlebars'),
    iframeReplacement = require('node-iframe-replacement'),
    config = require('config');

    options = {
        cert: fs.readFileSync('./../config/sert/server.crt'),
        key: fs.readFileSync('./../config/sert/server.key')
    };

function Server() {

    var app = express();

    app.use(iframeReplacement);
    app.engine('hbs', exphbs());
    app.set('views', path.resolve(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.get('/', function(req, res) {

        res.merge(config.get('view'), {
            sourceUrl: config.get('url'),
            sourcePlaceholder: config.get('cssPlace')
        });
    });

    https.createServer(options, app).listen(config.get('port'), () => {
        console.log('Server started. Visit https://localhost:' + config.get('port'));
    });
}

module.exports = new Server();