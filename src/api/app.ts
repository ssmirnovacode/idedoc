import { NextFunction, RequestHandler, Response, Router } from "express";

const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.json())

app.use((req: Request,res: Response,next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // http://localhost:3000 || https://ssmirnovacode.github.io
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const router = Router();
const saveHandler: RequestHandler = (req,res) => {
    const { bundle } = req.body;
    fs.writeFile('output/my-bundle.txt', bundle, (err: Error) => {
        if (err) {
            res.json({ done: false})
            throw err
        };
        return res.json({ done: true})
    }) 
}
const fetchHandler: RequestHandler = async (req,res) => {
    try {
        await fs.readFile('output/my-bundle.txt', 'utf8', (err: Error, data: string) => {
            if (err) return res.json({ error: err })
            else return res.json({ data })
        });
    } catch (err: any) {
        return res.json({ error: err})
    }
    
}
router.get('/', fetchHandler)
router.post('/' , saveHandler)

app.use('/', router)

app.listen(3001, () => console.log('Server is running on port 3001'))

