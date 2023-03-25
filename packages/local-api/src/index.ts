export const serve = (port: number, filename: string, dir: string) => { // *dir
    console.log(`Serving traffic on port ${port}, saving cells from ${filename} inside directory ${dir}`)
}

// * dir is where the file is (should be) located (user might type the file with path like 'workspace/notes/notebook.js')