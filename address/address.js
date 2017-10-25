'use strict';
const assert = require('assert');
const bs58 = require('bs58');
const hash = require('../utilities/hash');

function encodeAddress(publicKey) {
    assert(Buffer.isBuffer(publicKey));
    assert.equal(publicKey.length, 33);

    let addressBuf = Buffer.alloc(26);
    let pubKeyHash = hash.ripemd160(hash.sha256(publicKey));
    let checksum = Buffer.from('06e0' + hash.adler32(pubKeyHash, 'hex'), 'hex');
    
    checksum.copy(addressBuf, 0);
    pubKeyHash.copy(addressBuf, 6);
    return bs58.encode(addressBuf);
}

function decodeAddress(address){
    let addressBuf = bs58.decode(address);

    assert(Buffer.isBuffer(addressBuf));
    assert.equal(addressBuf.length, 26);

    return {
        version: addressBuf.slice(0,2),
        checksum: addressBuf.slice(2,6),
        pubKeyHash: addressBuf.slice(6)
    };
}

function validate(address){
    let decoded = decodeAddress(address);
    return decoded.checksum.compare(hash.adler32(decoded.pubKeyHash)) == 0;
}

module.exports = {encodeAddress, decodeAddress, validate};