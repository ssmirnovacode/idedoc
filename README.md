# IDE Doc

## Dynamic npm-packages fetching
Using a customised plugin for ESBuild that intercepts int onLoad event so that instead of looking for a package in file system it is fetched directly from NPM (unpkg.io, that gives us direct access to NPM content without CORS issues).

CSS: ESBuild requires an output file for CSS bundle, and we don't have access to the file system. Therefore, we wrapped CSS content into JS and inject it to the code.

## Cacheing
As we fetch NPM packages for every import, there can be a lot of requests. To handle it better, we are using IndexedDB via localforage library and saving the configuration objects for fetched packages there.