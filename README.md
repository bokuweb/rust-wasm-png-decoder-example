# rust-wasm-png-decoder-example

png decoder example by wasm32-unknown-unnkown.

## Requirements

- NodeJS: v8+
- GNU make
- wasm-gc
- rustc 1.24.0-nightly

## Build

```
make
```

## Run example

```
npm i https://github.com/bokuweb/rust-wasm-png-decoder-example
```

```
const fs = require('fs');
const decode = require("wasm-png-decoder");
console.log(decode(fs.readFileSync('foo.png')));
```

## Benchmark

```
## 0.png
rust-png wasm x 10,912 ops/sec ±0.87% (90 runs sampled)
pngjs x 2,882 ops/sec ±1.30% (85 runs sampled)
Fastest is rust-png wasm

## 1.png
rust-png wasm x 6,913 ops/sec ±14.55% (62 runs sampled)
pngjs x 2,839 ops/sec ±1.11% (89 runs sampled)
Fastest is rust-png wasm

## 2.png
rust-png wasm x 12,349 ops/sec ±1.83% (85 runs sampled)
pngjs x 2,839 ops/sec ±1.42% (90 runs sampled)
Fastest is rust-png wasm

## 3.png
rust-png wasm x 8,360 ops/sec ±0.84% (90 runs sampled)
pngjs x 2,801 ops/sec ±1.61% (88 runs sampled)
Fastest is rust-png wasm

## 4.png
rust-png wasm x 8,407 ops/sec ±1.08% (92 runs sampled)
pngjs x 6,935 ops/sec ±2.71% (85 runs sampled)
Fastest is rust-png wasm

## 5.png
rust-png wasm x 5,732 ops/sec ±1.49% (91 runs sampled)
pngjs x 2,414 ops/sec ±1.14% (90 runs sampled)
Fastest is rust-png wasm

## 6.png
rust-png wasm x 6,643 ops/sec ±1.01% (91 runs sampled)
pngjs x 7,138 ops/sec ±2.16% (80 runs sampled)
Fastest is pngjs

## 7.png
rust-png wasm x 2,220 ops/sec ±0.88% (90 runs sampled)
pngjs x 1,957 ops/sec ±1.28% (89 runs sampled)
Fastest is rust-png wasm

## 8.png
rust-png wasm x 11,944 ops/sec ±1.01% (91 runs sampled)
pngjs x 2,929 ops/sec ±1.12% (90 runs sampled)
Fastest is rust-png wasm

## 9.png
rust-png wasm x 5,229 ops/sec ±0.92% (87 runs sampled)
pngjs x 10,119 ops/sec ±1.12% (92 runs sampled)
Fastest is pngjs
```

https://bokuweb.github.io/rust-wasm-png-decoder-example/index.html






