const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tasks database.');
});


db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  status TEXT
)`);


app.post('/tasks', (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const sql = `INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)`;
  db.run(sql, [title, description, dueDate, status], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});


app.get('/tasks', (req, res) => {
  const sql = `SELECT * FROM tasks`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});


app.put('/tasks/:id', (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const sql = `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?`;
  db.run(sql, [title, description, dueDate, status, req.params.id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ updated: this.changes });
  });
});


app.delete('/tasks/:id', (req, res) => {
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.run(sql, req.params.id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

