import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
    .command('serve [filename]') // [] mean optional value
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005') // <> mean required value
    .action((filename='notebook.js', options: { port: string }) => { // what happens on command 'serve'
        const dir = path.join(process.cwd(), path.dirname(filename));
        serve(+options.port, path.basename(filename), dir)
    })