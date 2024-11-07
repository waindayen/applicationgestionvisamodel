import Database from 'better-sqlite3';

const db = new Database('visatrack.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS visa_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    country TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    nationality TEXT NOT NULL,
    submission_date DATETIME NOT NULL,
    expiry_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

// Create indexes
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_visa_applications_user_id ON visa_applications(user_id);
  CREATE INDEX IF NOT EXISTS idx_visa_applications_status ON visa_applications(status);
`);

console.log('Database setup completed!');