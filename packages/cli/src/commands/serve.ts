import { Command } from 'commander';

export const serveCommand = new Command()
    .command('serve [filename]') // [] mean optional value
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005') // <> mean required value
    .action((filename='notebook.js', options) => { // what happens on command 'serve'
        console.log(filename, options)
    })