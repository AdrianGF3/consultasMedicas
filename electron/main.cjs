const { app, BrowserWindow } = require("electron");

// Importante importar la base de datos a la ventana 
require("./database.cjs");

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800
  });

  //solo servira en desarrollo
  window.loadURL("http://localhost:5173");

  //herramientas de desarrollo
  window.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});