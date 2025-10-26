
import { writeFile, access, constants } from 'node:fs/promises';
import { join } from 'node:path';

const create = async () => {

  const
    myFile = join("files", "fresh.txt"),
    myErr = 'FS operation failed',
    wrFile = () => writeFile(myFile, 'I am fresh and young', 'utf8'),
    check = () => access(myFile, constants.F_OK);

  try { await check(); throw new Error(myErr)}
  catch (err) {
    if (err.code === 'ENOENT') { await wrFile() }
    else { throw new Error(myErr) }
  }
};


await create();