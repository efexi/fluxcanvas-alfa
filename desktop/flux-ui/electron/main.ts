import { app, BrowserWindow } from 'electron'
import { spawn } from 'child_process'
import * as path from 'path'

let pyServer: any

function createWindow() {
    pyServer = spawn('python', ['../../ai-services/server.py'])

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
