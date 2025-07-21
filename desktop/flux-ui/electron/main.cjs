const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

let pyServer

function createWindow() {
    const aiServices = path.resolve(__dirname, '../../../ai-services')
    const uploadFolder = path.resolve(aiServices, 'uploads')
    const pythonPath = path.resolve(aiServices, '.venv/bin/python') // Mac/Linux

    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true })
    }

    pyServer = spawn(pythonPath, [`${aiServices}/server.py`])

    pyServer.stdout.on('data', (data) => {
        console.log(`[PY]: ${data}`)
    })

    pyServer.stderr.on('data', (data) => {
        console.error(`[PY ERROR]: ${data}`)
    })

    pyServer.on('close', (code) => {
        console.log(`Python server exited with code ${code}`)
    })

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    win.loadURL('http://localhost:5173').then()

    win.on('closed', () => {
        if (pyServer) pyServer.kill('SIGINT')
    })
}

app.whenReady().then(createWindow)
