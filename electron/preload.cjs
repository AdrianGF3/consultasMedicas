const {
  contextBridge,
  ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
  "api",
  {
    addPatient: (patient) =>
      ipcRenderer.invoke("add-patient", patient),

    getPatients: () =>
      ipcRenderer.invoke("get-patients"),

    getAppointments: () =>
      ipcRenderer.invoke("get-appointments")
  }
);