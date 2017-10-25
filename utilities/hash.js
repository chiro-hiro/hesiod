'use strict';

const crypto = require('crypto');
const adler32 = require('adler32');
const ripemd160 = require('ripemd160');

function sha256(value, encode) {
    return crypto.createHash('sha256').update(value).digest(encode || undefined);
}

function adler32(value, encode) {
    if (typeof (encode) !== 'undefined' && encode === 'hex') {
        return adler32.sum(value).toString(16);
    }
    return Buffer.from(adler32.sum(value).toString(16), 'hex');
}

function ripemd160(value, encode) {
    return new ripemd160().update(value).digest(encode || undefined);
}

module.exports = {sha256, adler32, ripemd160};