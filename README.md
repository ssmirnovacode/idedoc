# IDE Doc

TODO:
1. switch of language for text editor
2. JSX syntax highlighting

## Dynamic npm-packages fetching
Using a customised plugin for ESBuild that intercepts int onLoad event so that instead of looking for a package in file system it is fetched directly from NPM (unpkg.io, that gives us direct access to NPM content without CORS issues).

CSS: ESBuild requires an output file for CSS bundle, and we don't have access to the file system. Therefore, we wrapped CSS content into JS and inject it to the code.

## Cacheing
As we fetch NPM packages for every import, there can be a lot of requests. To handle it better, we are using IndexedDB via localforage library and saving the configuration objects for fetched packages there.

## Instant code display
We are using srcDoc attribute on iframe with resulting code, which allows us to display the resulting app instantly. However, some browser features like localStorage and cookies won't be available. They will probably be enabled in upcoming versions.
We add a 'message' event listener to the iframe and issue postMessage everytime we submit code.

## Code Editor
We use Monaco-Editor wrapped into a React component. We enabled some nice features such as theme an prettier code formatter.

## Markdown Editor
Created with uie/react-md-editor

## Resizable windows
Using react-resizable library.

## Cumulative code

All code cells are connected, we don't have to re-import or re-define previously defined variables.

## show() helper function
Allowing to quickly view the argument passed to it in Preview window. Built-in JSX syntax support (React and ReactDOM imported behind the scenes by default)