'use strict';

const bip39 = require('bip39');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');
const address = require('../address/address');

function wallet() {
    return this;
}

wallet.prototype.generate = function () {
    this._masterSeed = bip39.mnemonicToSeed(bip39.generateMnemonic());
    this._privateKey = crypto.createHash('sha256').update(this._masterSeed).digest()
    this._publicKey = secp256k1.publicKeyCreate(this._privateKey);
    this._address = address.encodeAddress(this._publicKey);
    return this;
}

wallet.prototype.fromPassphrase = function (passphrase) {
    if (bip39.validateMnemonic(passphrase)) {
        this._masterSeed = bip39.mnemonicToSeed(passphrase);
        this._privateKey = crypto.createHash('sha256').update(this._masterSeed).digest()
        this._publicKey = secp256k1.publicKeyCreate(this._privateKey);
        this._address = address.encodeAddress(this._publicKey);
        return this;
    }
    throw new Error('Invalid passphrase');
}

wallet.prototype.clean = function () {
    let index = ['_masterSeed', '_privateKey', '_publicKey'];
    for (let i = 0; i < index.length; i++) {
        for (let c = 0; c < this[index[i]].length; c++) {
            this[index[i]][c] ^= this[index[i]][c];
        }
    }
}

wallet.prototype.getAddress = function(){
    return this._address;
}

module.exports = wallet;