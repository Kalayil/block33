const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department_id INTEGER, created_at TEXT, updated_at TEXT)");
  
  db.run("INSERT INTO departments (name) VALUES ('HR'), ('Engineering'), ('Sales')");
  db.run("INSERT INTO employees (name, department_id, created_at, updated_at) VALUES ('John Doe', 1, datetime('now'), datetime('now'))");
});

module.exports = db;
