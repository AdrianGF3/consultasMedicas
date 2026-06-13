const {
  contextBridge,
  ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
  "api",
  {
    addPaciente: (paciente) =>
      ipcRenderer.invoke("add-paciente", paciente),

    getPacientes: () =>
      ipcRenderer.invoke("get-pacientes"),

    getCitas: () =>
      ipcRenderer.invoke("get-citas")
  }
);