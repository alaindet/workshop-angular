import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const ROOT_PATH = dirname(dirname(__dirname));
const DATABASE_PATH = join(ROOT_PATH, 'database');

export function loadDatabaseTable<T = any>(fileName: string) {
  const filePath = join(DATABASE_PATH, `${fileName}.json`);
  const rawContent = readFileSync(filePath, { encoding: 'utf-8' });
  return JSON.parse(rawContent) as T[];
}
