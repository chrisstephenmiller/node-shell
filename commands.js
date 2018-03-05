let request = require('request');
let fs = require('fs');

module.exports = commands;

function done () {
    process.stdout.write("prompt > ");
}

let commands = {
    pwd: function (file) {
        process.stdout.write(process.cwd());
    },
    ls: function (file) {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            files.forEach(function (file) {
                process.stdout.write(file.toString() + "\n");
            })
        });
    },
    echo: function (file) {
        process.stdout.write(file.join(' '));
    },
    cat: function (file) {
        let fileName = './' + file.toString();
        fs.readFile(fileName, function (err, file) {
            if (err) throw err;
            process.stdout.write(file);
        })
    },
    head: function (file) {
        let fileName = './' + file.toString();
        fs.readFile(fileName, function (err, file) {
            if (err) throw err;
            let body = file.toString().split('\n').slice(0, 5).join('\n');
            process.stdout.write(body)
        });
    },
    tail: function (file) {
        let fileName = './' + file.toString();
        fs.readFile(fileName, function (err, file) {
            if (err) throw err;
            let body = file.toString().split('\n').slice(-6).join('\n');
            process.stdout.write(body)
        });
    },
    sort: function (file) {
        let fileName = './' + file.toString();
        fs.readFile(fileName, function (err, file) {
            if (err) throw err;
            let body = file.toString().split('\n').sort().join('\n');
            process.stdout.write(body)
        });
    },
    wc: function (file) {
        let fileName = './' + file.toString();
        fs.readFile(fileName, function (err, file) {
            if (err) throw err;
            let count = file.toString().split('\n').length.toString();
            process.stdout.write(count)
        });
    },
    uniq: function (file) {
        let fileName = './' + file.toString();
        fs.readFile(fileName, function (err, file) {
            if (err) throw err;
            let body = file.toString().split('\n').sort();
            let newBody = [];
            for (let i = 0; i < body.length; i++) {
                if (body[i] !== newBody[newBody.length - 1]) {
                    newBody.push(body[i])
                };
            }
            process.stdout.write(newBody.join('\n'))
        });
    },
    curl: function (url) {
        let fullUrl = 'http://' + url;
        request(fullUrl, function (error, response, body) {
            process.stdout.write(body)
        });
    }
}



