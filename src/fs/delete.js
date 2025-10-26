//delete.js - implement function that deletes file fileToRemove.txt (if there's no file fileToRemove.txt Error with message FS operation failed must be thrown)
import { unlink, access, constants } from 'node:fs/promises';
import { join } from 'node:path';

const remove = async () => {

  const
    filePath = join("files", "fileToRemove.txt"),
    throwErr = () => { throw new Error('FS operation failed') },
    del = (filePath) => unlink(filePath),
    check = (file) => access(file, constants.F_OK);;


  try {

    await check(filePath);

    try { await del(filePath) }
    catch { throwErr() }

  } catch { throwErr() }




};

await remove();
