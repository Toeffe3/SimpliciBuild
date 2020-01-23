const {app, Menu, MenuItem, BrowserWindow} = require('electron')
const path = require('path')
const isMac = process.platform === 'darwin'
const template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      { label: 'Open', click: () =>  { console.log("OPEN") } },
      {
        label: 'Recent opened', submenu: [
          { label: '(none)' },
          { type: 'separator' },
          { label: 'Clear all' }
        ]
      },
      { type: 'separator' },
      { label: 'Settings', click: () =>  { console.log("SETTINGS") }},
      { type: 'separator' },
      { role: 'reload' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Save', accelerator: "CmdOrCtrl+S", click: () =>  { console.log("SAVE") } },
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

// app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
// app.clearRecentDocument()


let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
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
