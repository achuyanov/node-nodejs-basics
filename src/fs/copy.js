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
