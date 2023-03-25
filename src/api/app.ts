import { RequestHandler, Router } from "express";

const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.json())

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

