const {app, Menu, MenuItem, dialog, BrowserWindow} = require('electron');
const ipcMain = require('electron').ipcMain;
const path = require('path');
const fs = require('fs');
const isMac = process.platform === 'darwin'
const template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services'},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      {label: 'Open', click: () =>  {console.log("OPEN");}},
      {
        label: 'Recent opened', submenu: [
          {label: '(none)'},
          {type: 'separator'},
          {label: 'Clear all', click: () => {app.clearRecentDocument();}}
        ]
      },
      {type: 'separator'},
      {label: 'Settings', click: () =>  {console.log("SETTINGS");}},
      {type: 'separator'},
      {role: 'reload'},
      isMac ? {role: 'close'} : {role: 'quit'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Save', accelerator: "CmdOrCtrl+S", click: () =>  { saveAs(); } },
      { label: 'SaveAs', accelerator: "CmdOrCtrl+Shift+S", click: () =>  { saveAs(true); } },
      { type: 'separator' },
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { type: 'separator' },
      { label: 'Project settings', accelerator: "CmdOrCtrl+,", click: () =>  { console.log("PROJECT SETTINGS") } }
    ]
  },
  {
    label: 'Page',
    submenu: [
      { label: 'Themes', click: () =>  { console.log("Themes") } },
      { label: 'Change styles', click: () =>  { console.log("Change styles") } },
      { type: 'separator' },
      { label: 'Add subpage', click: () =>  { console.log("Add subpage") } },
      { label: 'Add internationality', click: () =>  { console.log("Add internationality") } },
      { type: 'separator' },
      { label: 'Preview', click: () =>  { console.log("Preview") } },
      { label: 'Export', accelerator: "CmdOrCtrl+E", click: () =>  { console.log("Export") } },
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

let mainWindow, pages = {}, layouts = {}, themes = {"default": {}}, savePath, readOnly = true;

ipcMain.handle('save', async function(event, ...args) {
  console.log("Auto-save", args);
  pages = args[0];
  layouts = args.length > 2 ? args[1] : {};
  themes = args.length > 3 ? args[2] : {};
  return saveAs(false);
});

async function saveAs(ask=false) {
  console.log(readOnly, "RO", ask, "A");
  if(readOnly || ask) {
    let saveInfo = await dialog.showSaveDialog({
      properties: ["createDirectory"],
      filters: [
        {name: "JavaScript Object", extensions: ["json"]},
        {name: "SimpliciBuild Export", extensions: ["sbe"]},
        {name: "ZIP file", extensions: ["zip", "rar", "7z"]}
      ]
    });
    if (saveInfo.canceled) return false;
    savePath = saveInfo.filePath;
    let extension = savePath.split(".")[1];
    console.log(savePath, extension);
  }
  if (savePath === undefined) {
    return ask?"No destination":"Could not save!";
  } else if(pages) {
    fs.writeFile(savePath, JSON.stringify(pages), {encoding: 'utf8', flag: 'w'}, function(err) {
      if(err) console.log("An error ocurred saving the file "+ err.message);
      else {
        console.log("The file has been succesfully saved");
        app.addRecentDocument(savePath);
        readOnly = false;
      }
    });
  } else {
    console.log("Could not load content to file");
  }
  return savePath;
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow);
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
