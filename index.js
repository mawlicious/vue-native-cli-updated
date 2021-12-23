const { program } = require('commander');
const { version } = require('../package.json');
const prompts = require('prompts');
const isValidPath = require('is-valid-path');

program.version(version);

program
    .command('init <path>')
    .description('Initialize a new project')
    .action(async path => {
        if (!isValidPath(path)) {
            console.log('Invalid path');
            return;
        }
        require('./init.js')(path);
    });

program.parse(process.argv);