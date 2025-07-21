const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')

let pyServer

function createWindow() {
    const pythonPath = '../../ai-services/.venv/bin/python' // Mac/Linux
    pyServer = spawn(pythonPath, ['../../ai-services/server.py'])

    pyServer.stdout.on('data', (data) => {
        console.log(`[PY]: ${data}`)
    })

    pyServer.stderr.on('data', (data) => {
        console.error(`[PY ERROR]: ${data}`)
    })

    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })

    win.loadURL('http://localhost:5173')

    win.on('closed', () => {
        if (pyServer) pyServer.kill('SIGINT')
    })
}

app.whenReady().then(createWindow)
