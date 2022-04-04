const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
// const block = new Block();
 const {BlockChain} = require('./blockchain');
 const {Transaction} = require('./transaction');

const myKey = ec.keyFromPrivate('d25ca074c8f3c1f9cc1cf621399e57a6a5dc6bd53e6f6a0f08e16366b086971e');
const myWalletAddress = myKey.getPublic('hex');

let testerChain = new BlockChain();


const tx1 = new Transaction(myWalletAddress,'publickeyforReciever',10);
tx1.signTransaction(myKey);
testerChain.addTransaction(tx1);

console.log('\n start mining...');

console.log(tx1);


console.log('\n start mining again ...');
testerChain.minePendingTransactions(myWalletAddress);
console.log(' balance is ' + testerChain.getBalanceOfAddress(myWalletAddress));

console.log('\n previous hash '+ JSON.stringify(testerChain.getLatestBlock(),null,4));

//testerChain.chain[1].transactions[0].amount = 50;

console.log(' valid ' + testerChain.isChainValid());




//testerChain.addBlock(new Block('1',"01/02/2009",'mans'));
// console.log("Mining Block1.....");
// testerChain.addBlock(new Block('1', "01/02/2009", 'mans'));
// console.log("Mining Block2.....");
// testerChain.addBlock(new Block('2', "01/02/2009", 'mans'));
// console.log("Mining Block3.....");
// testerChain.addBlock(new Block('3', "02/05/2021", 'teest'));
// console.log(JSON.stringify(testerChain,null,4))