import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

let db: any = null;

export const initDB = async () => {
  if (db) return db;

  try {
    const sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    });

    const p = new sqlite3.oo1.DB('/visa.db', 'ct');
    
    // Create tables if they don't exist
    p.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS visas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        applicant_name TEXT NOT NULL,
        passport_number TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // Add a test user if none exists
    p.exec(`
      INSERT OR IGNORE INTO users (name, email, password)
      VALUES ('Test User', 'test@example.com', 'password123');
    `);

    db = p;
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export const createUser = async (user: { name: string; email: string; password: string }) => {
  const p = await initDB();
  try {
    p.exec({
      sql: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      bind: [user.name, user.email, user.password],
    });
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const getUserByEmail = async (email: string) => {
  const p = await initDB();
  try {
    const stmt = p.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const createVisa = async (visa: {
  user_id: number;
  type: string;
  status: string;
  applicant_name: string;
  passport_number: string;
}) => {
  const p = await initDB();
  try {
    p.exec({
      sql: 'INSERT INTO visas (user_id, type, status, applicant_name, passport_number) VALUES (?, ?, ?, ?, ?)',
      bind: [visa.user_id, visa.type, visa.status, visa.applicant_name, visa.passport_number],
    });
    return true;
  } catch (error) {
    console.error('Error creating visa:', error);
    return false;
  }
};

export const getVisasByUserId = async (userId: number) => {
  const p = await initDB();
  try {
    const stmt = p.prepare('SELECT * FROM visas WHERE user_id = ? ORDER BY created_at DESC');
    return stmt.all(userId);
  } catch (error) {
    console.error('Error getting visas:', error);
    return [];
  }
};