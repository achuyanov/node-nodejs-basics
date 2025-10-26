// rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md (if there's no file wrongFilename.txt or properFilename.md already exists Error with message FS operation failed must be thrown)

import { rename as renameFile, access, constants } from 'node:fs/promises';
import { join } from 'node:path';

const rename = async () => {

  const
    oldName = join("files","wrongFilename.txt"),
    newName = join("files","properFilename.md"),
    throwErr = () => { throw new Error('FS operation failed') },
    check = (file) => access(file, constants.F_OK);


try {
    await check(oldName);

    try { await check(newName); throwErr(); }
    catch (err) {

      if (err.code !== 'ENOENT') { throw err }

      else {
        try { await renameFile(oldName, newName) }
        catch { throwErr() }
      }
    }
  } catch { throwErr() }





};

await rename();
