import chalk from 'chalk';
import fs from 'fs';

function getNotes() {
    return 'Your notes...';
}

function addNote(title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({ title: title, body: body });
        saveNotes(notes);
        console.log('Note added:', title);
    }else {
        console.log('Note title already taken!')
    }
    
}

function saveNotes(notes) { 
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');   
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}


function removeNote(title){
    const notes = loadNotes();
    const duplicateNote = notes.filter((note) => note.title !== title);

    if (notes.length > duplicateNote.length) {
        saveNotes(duplicateNote);
        console.log(chalk.inverse.bold.green('Note removed:', title));
    }else {
        console.log(chalk.inverse.bold.red('No note found'));
    }

}

const listNotes = (title) => {
    const notes = loadNotes();

    if(notes.length > 0) {
        console.log(chalk.inverse.yellow('Your note'))
        notes.forEach((note) => {
            console.log(note.title)
        })
    } else{
        console.log(chalk.inverse.bold.bgMagenta("There's NO notes available"))
    }
}

const readNotes = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title === title )

    if(noteFound) {
            console.log(chalk.inverse.green(noteFound.title))
            console.log(noteFound.body)
    } else{
        console.log(chalk.inverse.bold.bgMagenta("No note found"))
    }


}

export { getNotes, addNote, removeNote, listNotes, readNotes };