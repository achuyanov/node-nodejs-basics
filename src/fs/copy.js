//copy.js - implement function that copies folder files files with all its content into folder files_copy
//  at the same level (if files folder ///doesn't exist or files_copy has already been created
//  Error with message FS operation failed must be thrown)

import { cp, access, constants } from 'node:fs/promises';
import { join } from 'node:path';


const copy = async () => {

  const
    myFolder = join("files"),
    newFolder = join("files_copy"),
    myErr = 'FS operation failed',
    throwErr = () => { throw new Error(myErr) },
    copyFolder = (fl1, fl2) => cp(fl1, fl2, { recursive: true }),
    check = (fl) => access(fl, constants.F_OK);

  try {
    await check(myFolder);

    try { await check(newFolder); throwErr(); }
    catch (err) {

      if (err.code !== 'ENOENT') { throw err }

      else {
        try { await copyFolder(myFolder, newFolder) }
        catch { throwErr() }
      }
    }
  } catch { throwErr() }
};

await copy();
