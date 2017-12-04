build:
	mkdir -p wasm
	cargo +nightly build --target wasm32-unknown-unknown --release
	wasm-gc target/wasm32-unknown-unknown/release/rust-wasm-png-decoder.wasm wasm/main.wasm
