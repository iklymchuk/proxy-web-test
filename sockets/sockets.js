const fs = require('fs');
var npmRun = require('npm-run');
var config = require('config');

var adminNamespace = (socket) => {
    
    socket.on('url', (url) => {
        console.log(url + ' will be proxy');
        socket.emit('url', url);
 

    socket.on('test', (test) => {
        console.log(test + ' will be executed');
        socket.emit('test', test);

        /*
        //need to add server side validation
        if (url !== "https://www.google.com.ua") {
            console.error('INCORRECT portal URL');
        } else if (test !== "google") {
            console.error('INCORRECT TEST');            
        }
        */
        var proxy = {  
            port: 8444,
            url: url, 
            test: "https://localhost:8443/js/" + test + ".test.js", 
            view: 'inject-script',
            cssPlace: '#rufous-sandbox'
        };
            //cssPlace: '#footc'
            
            var data = JSON.stringify(proxy);  
            fs.writeFileSync('./proxy/config/test.json', data); 

            var path = config.get('path');
            npmRun.exec('npm start', {cwd: path}, function (err, stdout, stderr) {
                console.log(err);
                console.log(stdout);
                console.log(stderr);
                
            })

        })
    })
};

module.exports.adminNamespace = adminNamespace;