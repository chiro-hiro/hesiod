'use strict';
const hash = require('../utilities/hash.js');
const bigNumber = require('bignumber.js');

function tx(txData) {
    const defaultTx = {
        from: '',
        to: '',
        amount: bigNumber(0),
        nonce: bigNumber(0)
    };
    for (let i in defaultTx) {
        this[i] = (typeof (txData[i]) !== 'undefined') ? txData[i] : defaultTx[i];
    }
    return this;
}

tx.prototype.serialize = function () {
    var buf = [];
    buf.push(Buffer.from(this.from));
    buf.push(Buffer.from('00', 'hex'));
    buf.push(Buffer.from(this.to));
    buf.push(Buffer.from('00', 'hex'));
    buf.push(Buffer.from(this.amount.toString(16), 'hex'));
    buf.push(Buffer.from('00', 'hex'));
    buf.push(Buffer.from(this.nonce.toString(16), 'hex'));
    return Buffer.concat(buf);
}

tx.prototype.from = function (serialized) {
    if(!Buffer.isBuffer(serialized)){
        throw new TypeError('Input data should be buffer');
    }
}

module.exports = tx;