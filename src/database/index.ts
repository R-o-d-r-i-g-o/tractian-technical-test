import sqlite3, { Database } from 'sqlite3';

// Note: allow debuging
sqlite3.verbose()

type UnitName = 'apex' | 'jaguar' | 'tobias';

const formatConnURI = (key: UnitName): string => `database-${key}.db`

const instanceSqlite = (collName: UnitName) => {
  const filePath = formatConnURI(collName)

  return new sqlite3.Database(
    filePath,
    sqlite3.OPEN_READWRITE,
    (err) => {
      console.log('ERROR TO CONNECT SQLITE', err)
    }
  );
}

export { instanceSqlite, type UnitName, type Database };



