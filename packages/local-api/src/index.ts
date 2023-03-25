import express from 'express'

export const serve = (port: number, filename: string, dir: string) => { // *dir

   const app = express();

   return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
   })
}

// * dir is where the file is (should be) located (user might type the file with path like 'workspace/notes/notebook.js')