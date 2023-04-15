# IDE Doc

Browser-based code and documentation editor with CLI.

```npm install -g idedoc```

To run the app: ```npx idedoc serve```

## Dynamic npm-packages fetching

Using a customised plugin for ESBuild that intercepts the onLoad event so that instead of looking for a package in file system it is fetched directly from NPM (unpkg.io, that gives us direct access to NPM content without CORS issues).

CSS: ESBuild requires an output file for CSS bundle, and we don't have access to the file system. Therefore, we wrapped CSS content into JS and inject it to the code.

## Cacheing

As we fetch NPM packages for every import, there can be a lot of requests. To handle it better, we are using IndexedDB via localforage library and saving the configuration objects for fetched packages there.

## Instant code display

We are using srcDoc attribute on iframe with resulting code, which allows us to display the resulting app instantly. However, some browser features like localStorage and cookies won't be available. They will probably be enabled in upcoming versions.
We add a 'message' event listener to the iframe and issue postMessage everytime we submit code.

## Autosave

Your work gets saved automatically in a js file of your choosing (notebook.js in current working directory by default). You can also specify the port (4005 by default).

```npx idedoc serve src/anotherName.js -p 3001```

## Code Editor

We use Monaco-Editor wrapped into a React component. We enabled some nice features such as theme an prettier code formatter.

## Markdown Editor

Created with uie/react-md-editor

## Resizable windows

Using react-resizable library.

## Cumulative code

All code cells are connected, we don't have to re-import or re-define previously defined variables used in posterior code cells.

## show() helper function

Allowing to quickly view the argument passed to it in Preview window. Built-in JSX syntax support (React and ReactDOM imported behind the scenes by default)

