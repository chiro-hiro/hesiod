const wallet = require('./wallet/wallet.js');
const tx = require('./transaction/tx.js');
const bigNumber = require('bignumber.js');


var myWallet = new wallet();
var myTx = new tx({
    from: 'DDJfubHVavpFrQ9d7ufrMpWSvQ5ioe5xs6K',
    to: 'DDPQu9EHM6vExbQCRu6WkZ66vn8JgUUbNgf',
    amount: bigNumber(450),
    nonce: bigNumber(0)
});

console.log("Wallet:", myWallet);
console.log("Example tranasction:", myTx);
console.log("Tranasction serialized:", myTx.serialize());