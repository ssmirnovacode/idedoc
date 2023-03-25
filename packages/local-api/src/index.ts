import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const serve = (port: number, filename: string, dir: string) => { // *dir

   const app = express();

   //We are accessing our local-api on 4005 (dafault), but the request is being automatically proxied through the port where our React app is running (3000).
   app.use(createProxyMiddleware({
    target: 'http://localhost:3000',
    ws: true, // websocket support - default CRA behavior
    logLevel: 'silent'
   }))

   return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
   })
}

// * dir is where the file is (should be) located (user might type the file with path like 'workspace/notes/notebook.js')