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

//añadir paciente
function addPaciente(patient) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO pacientes
      (dni, nombre, telefono)
      VALUES (?, ?, ?)
      `,
      [
        patient.dni,
        patient.nombre,
        patient.telefono
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

//añadir cita
function addCita(cita) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO citas (paciente_dni, fecha, descripcion)
      VALUES (?, ?, ?)
      `,
      [
        cita.paciente_dni,
        cita.fecha,
        cita.descripcion
      ],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

//---------------------------------------------------------

//obtener pacientes
function getPacientes() {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM pacientes",
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

//obtener citas
function getCitas() {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM citas",
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

//---------------------------------------------------------

//eliminar cita
function deleteCita(id) {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM citas WHERE id = ?`,
      [id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

//cuando exportamos más de una función o variable.
module.exports = {
  db,
  addPaciente,
  getPacientes,
  addCita,
  getCitas,
  deleteCita
};