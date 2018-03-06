let request = require('request');
let fs = require('fs');

let commands = {

    pwd: function (args, done) {
        let output = process.cwd();
        done(output);
    },
    
    ls: function (args, done) {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            let output = files.join('\n');
            done(output)
        });
    },
    echo: function (args, done) {
        let output = args.split(' ').map(function (arg) {
            if (arg[0] === '$') {
                return process.env[arg.slice(1)];
            } else {
                return arg;
            }  
        }).join(' ');  
        done(output);
    },
    cat: function (args, done) {
        args = args.split(' ');
        let texts = [];
        let count = 0;
        args.forEach(function (arg, i){
            fs.readFile(arg, function (err, data) {
                if (err) throw err;
                texts[i] = data + '\n';
                count ++;
                if (count === args.length) {
                    let output = texts.join(' ');
                    done(output);
                }
            })
        })
    },
    head: function (args, done) {
        let file = './' + args;
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            let output = data.toString().split('\n').slice(0, 5).join('\n');
            done(output);
        });
    },
    tail: function (args, done) {
        let file = './' + args;
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            let output = data.toString().split('\n').slice(-6).join('\n');
            done(output);
        });
    },
    sort: function (args, done) {
        let file = './' + args;
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            let output = data.toString().split('\n').sort().join('\n');
            done(output);
        });
    },
    wc: function (args, done) {
        let file = './' + args;
        fs.readFile(fileName, function (err, data) {
            if (err) throw err;
            let output = data.toString().split('\n').length.toString();
            done(output);
        });
    },
    uniq: function (args, done) {
        let file = './' + args;
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            let lines = data.toString().split('\n').sort();
            let uniqueLines = [];
            for (let i = 0; i < lines.length; i++) {
                if (lines[i] !== uniqueLines[uniqueLines.length - 1]) {
                    uniqueLines.push(lines[i])
                };
            }
            let output = uniqueLines.join('\n');
            done(output);
        });
    },
    curl: function (url, done) {
        let fullUrl = 'http://' + url;
        request(fullUrl, function (error, response, body) {
            let output = body;
            done(output)
        });
    }

}

module.exports = commands;