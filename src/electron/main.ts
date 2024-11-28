// TODO: cleanup after finalizing
import { app, BrowserWindow } from "electron";
import path from "path";
// import { isDev } from "./util.js";
import { registerRoute } from "./lib/electron-router-dom.js";

// crashes on build
// type test = string;
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      preload: path.join(app.getAppPath(), "src/electron/preload.cts"),
    },
  });
  // if (isDev()) {
  //   //allows us to hot reload
  //   mainWindow.loadURL("http://localhost:3000");
  // } else {
  //   mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  // }
  registerRoute({
    // registerroute takes care of runing loadurl or loading file
    id: "main",
    browserWindow: mainWindow,
    htmlFile: path.join(app.getAppPath(), "/dist-react/index.html"),
  });
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
