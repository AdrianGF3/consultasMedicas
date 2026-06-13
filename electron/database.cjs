const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./database/consultas.db",
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Base de datos conectada");
    }
  }
);

// como en mySQL
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pacientes (
      dni TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      telefono TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_dni TEXT NOT NULL,
      fecha TEXT NOT NULL,
      descripcion TEXT NOT NULL,

      FOREIGN KEY (paciente_dni)
      REFERENCES pacientes(dni)
      ON DELETE CASCADE
    )
  `);
});



module.exports = db;