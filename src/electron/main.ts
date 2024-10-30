import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

// crashes on build
// type test = string;

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) { //allows us to hot reload
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile(
            path.join(app.getAppPath(), "/dist-react/index.html")
        );
    }
});
