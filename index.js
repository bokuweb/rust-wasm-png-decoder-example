'use strict';

const fs = require('fs');
const path = require('path');
const wasm = fs.readFileSync(path.join(__dirname, './wasm/main.wasm'));
const mod = new WebAssembly.Instance(new WebAssembly.Module(wasm));

module.exports = (buf) => {
    const heap = new Uint8Array(mod.exports.memory.buffer);
    const ptr = mod.exports.alloc(buf.length);
    heap.set(buf, ptr);

    const resultPtr = mod.exports.decode(ptr, buf.length);
    mod.exports.free(ptr, buf.length)
    const resultBuf = new Uint8Array(mod.exports.memory.buffer, resultPtr);
    const getSize = (buf) => {
        let i = 0;
        while (buf[i] !== 0) i++;
        return i;
    }
    const resultSize = getSize(resultBuf);
    const json = String.fromCharCode.apply(null, resultBuf.slice(0, resultSize));
    mod.exports.free(resultPtr, resultSize)
    const result = JSON.parse(json);
    const data = new Uint8Array(result.len);
    const target = new Uint8Array(mod.exports.memory.buffer, result.ptr, result.len);
    data.set(target);
    const ret = {
        width: result.width,
        height: result.height,
        buf: data
    }
    mod.exports.free(result.ptr, result.len);
    return ret;
}

