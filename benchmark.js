'use strict';

const Benchmark = require('benchmark');
const util = require('util');
const fs = require('fs');
const path = require('path');
const decode = require("./");
const { PNG } = require("pngjs");


for (let i = 0; i < 10; i++) {
    const buf = fs.readFileSync(`./png/${i}.png`);
    decode(buf);
    PNG.sync.read(buf);

    console.log(`\n## ${i}.png`);

    const suite = new Benchmark.Suite(`${i}.png`);
    suite
        .add('rust-png wasm', {
            fn: () => decode(buf),
        })
        .add('pngjs', {
            fn: () => PNG.sync.read(buf),
        })
        .on('cycle', (event) => {
            console.log(String(event.target));
        })
        .on('complete', () => {
            console.log('Fastest is ' + suite.filter('fastest').map('name'));
        })
        .run();

}