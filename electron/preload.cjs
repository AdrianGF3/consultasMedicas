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
      ipcRenderer.invoke("get-citas"),

    addCita: (cita) =>
      ipcRenderer.invoke("add-cita", cita),

    deleteCita: (id) =>
      ipcRenderer.invoke("delete-cita", id),

    deletePaciente: (dni) =>
      ipcRenderer.invoke("delete-paciente", dni)
  }
);