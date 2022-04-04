const SHA256 = require('crypto-js/SHA256');
const { Transaction } = require('./transaction');
class Block {
    constructor(timestamp, transactions, hash, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calcHash();
        this.nonce = 0; 
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }

        }
        return true
    }


    //create the hash for the block
    calcHash() {
        return SHA256(this.timestamp + this.nonce + JSON.stringify(this.transactions), this.previousHash).toString();
    }

    mineBlock(difficulty) {   // creating blocks with the a specific requirment hash
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++;
        this.hash = this.calcHash();
        }
        console.log("Block Mined " + this.hash);
    }
    
}

module.exports.Block = Block;



