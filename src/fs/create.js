// create.js - implement function that creates new file fresh.txt
// with content I am fresh and young inside of the files folder
// (if file already exists Error with message FS operation failed must be thrown)

import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { writeFile, access, F_OK, } from 'fs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const file = join(__dirname, 'files', 'fresh.txt');
const text = 'I am fresh and young';
const ErrMgg = (err) => { if (err) throw err }

const create = async () => {
  access(file, F_OK, (err) => {
    if (err) { writeFile(file, text, ErrMgg) }
    else throw new Error("FS operation failed")
  })
};

await create();
