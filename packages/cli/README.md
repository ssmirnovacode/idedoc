# IDE Doc

Browser-based code and documentation editor with CLI.

`npm install -g idedoc`

To run the app: `npx idedoc serve`

You can create unlimted number of code editor cells and .md editor cells, delete them, change their order of appearance.

The code is cumulative between cells, which means that you don't have to re-declare variables or imports declared in previous code cells.

Your work gets saved automatically in a js file of your choosing (notebook.js in current working directory by default). You can also specify the port (4005 by default):
`npx idedoc serve src/anotherName.js -p 3001`

## Key features

- Dynamic npm-packages fetching
- Cacheing of imported npm packages into IndexedDB
- Instant code display
- Autosave
- `show()` helper function (Allowing to quickly view the argument passed to it in Preview window. Built-in JSX syntax support (React and ReactDOM imported behind the scenes by default))
