import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

// crashes on build
// type test = string;
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "src/electron/preload.cts"),
    },
  });
  if (isDev()) {
    //allows us to hot reload
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
};

// Boilerplate to handle different OS platforms
app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
