let commands = require('./commands');


// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
    var cmd = data.toString().trim(); // remove the newline
    var args = cmd.split(' ');
    var fileName = args.slice(1);


    commands[args[0]](fileName)

    process.stdout.write('\nprompt > ');
});

