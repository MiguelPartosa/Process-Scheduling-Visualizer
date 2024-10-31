// This file is a cts to enforce commonEJS for nodejs compatability reqs.
const { contextBridge } = require("electron");

// Boilerplate example API being exposed
contextBridge.exposeInMainWorld("myAPI", {
    desktop: true,
});
