const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/employees', (req, res) => {
  db.all("SELECT * FROM employees", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/departments', (req, res) => {
  db.all("SELECT * FROM departments", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/employees', (req, res) => {
  const { name, department_id } = req.body;
  const sql = "INSERT INTO employees (name, department_id, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))";
  db.run(sql, [name, department_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, department_id });
  });
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM employees WHERE id = ?", id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, department_id } = req.body;
  const sql = "UPDATE employees SET name = ?, department_id = ?, updated_at = datetime('now') WHERE id = ?";
  db.run(sql, [name, department_id, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, name, department_id });
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
