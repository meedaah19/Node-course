import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addNote, listNotes, readNotes, removeNote} from './notes.js';


  yargs(hideBin(process.argv))
  .command('add', 'Add a new note', (yargs) => {
    return yargs    
        .option('title', {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        })
        .option('body', {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        })
    }, (argv) => {
        addNote(argv.title, argv.body);
    })
  .command('remove', 'Remove a note', (yargs) => {
    return yargs    
        .option('title', {
            describe: 'remove note',
            demandOption: true,
            type: 'string'
        })
    }, (argv) => {
        removeNote(argv.title)
    }
)
  .command('list', 'List all notes', () => {
        listNotes()
    }, () => {  
    })

  .command('read', 'Read a note', (yargs) => {
    return yargs    
        .option('title', {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        })
    }, (argv) => {
        readNotes( argv.title);
    })
  .demandCommand(1, 'You need to specify at least one command')
  .strict()
  .help()
  .argv;