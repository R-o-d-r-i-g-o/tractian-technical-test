import sqlite3 from 'sqlite3';

// Note: allow debuging
sqlite3.verbose()

const db = new sqlite3.Database(':memory:');

