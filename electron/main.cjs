const { app, BrowserWindow, ipcMain } = require("electron");

//node lo necesita para las rutas
const path = require("path");

const {
  addPaciente,
  getPacientes,
  addCita,
  getCitas,
  deleteCita,
  deletePaciente   
} = require("./database.cjs");
// Importante importar la base de datos a la ventana 

//sin estos ipcMain.handle react no puede acceder a sqlite
ipcMain.handle(
  "add-paciente",
  (event, paciente) => addPaciente(paciente)
);

ipcMain.handle(
  "add-cita",
  (event, cita) => addCita(cita)
);

ipcMain.handle(
  "get-pacientes",
  () => getPacientes()
);

ipcMain.handle(
  "get-citas",
  () => getCitas()
);

ipcMain.handle(
  "delete-cita",
  (event, id) => deleteCita(id)
);

ipcMain.handle(
  "delete-paciente",
  (event, dni) => deletePaciente(dni)
);

//---------------------------------------------------------

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,

    //si no ponemos las preferencias de la web sale undefined y por eso no se cargaba la base de datos >:v
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  //solo servira en desarrollo
  window.loadURL("http://localhost:5173");

  //herramientas de desarrollo
  window.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});