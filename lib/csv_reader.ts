// import {promises as fs} from 'fs'; // 'fs/promises' not available in node 12
// import os from 'os';
import { parse } from 'csv';

export const readFile = async (file: ArrayBuffer) => {
//const content = await fs.readFile(`${os.tmpdir()}/input.csv`);

// Parse the CSV content
return parse(Buffer.from(file), {bom: true, delimiter: ';'});
}
