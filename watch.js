'use strict';

const chokidar = require('chokidar');
const ts = require('typescript');

let tsProgram;
chokidar.watch('type-definitions/create-type-definitions.ts').on('all', (event, path) => {
    console.log(`Compiling ${path}`);
    tsProgram = ts.createProgram([path], {}, undefined, tsProgram);
    tsProgram.emit(undefined, (...args) => {
        // console.log(...args);
        console.log(`Compiled ${path}`);
    });
});
