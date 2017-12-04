extern crate png;

use std::os::raw::{c_char, c_void};
use std::mem;
use std::ffi::CString;

#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

#[no_mangle]
pub fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub fn free(ptr: *mut c_void, size: usize) {
    unsafe {
        let _buf = Vec::from_raw_parts(ptr, 0, size);
    }
}

fn main() {}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DecodingResult {
    ptr: u32,
    len: u32,
    width: u32,
    height: u32,
}

#[no_mangle]
pub fn decode(ptr: *mut u8, len: usize) -> *mut c_char {
    let buf: &[u8] = unsafe { std::slice::from_raw_parts_mut(ptr, len) };
    let decoder = png::Decoder::new(buf);
    let (info, mut reader) = match decoder.read_info() {
        Ok(i) => i,
        Err(why) => panic!(why.to_string()),
    };
    let mut img_data = vec![0; info.buffer_size()];
    reader.next_frame(&mut img_data).unwrap();
    let result = DecodingResult {
        ptr: img_data.as_mut_ptr() as u32,
        len: info.buffer_size() as u32,
        width: info.width,
        height: info.height,
    };
    mem::forget(img_data);
    let res = serde_json::to_string(&result).unwrap();
    let c_str = CString::new(res).unwrap();
    c_str.into_raw()
}
