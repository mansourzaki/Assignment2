// import Block from './block';
const { Transaction } = require('./transaction');
const { Block } = require('./block');
const SHA256 = require('crypto-js/SHA256');


class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; //setting the number of zeros at first
        this.pendingTransactions = [];
        this.miningReward = 250;

    }

    createGenesisBlock() {
        return new Block(Date.parse('01/01/2008'), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(rewardAddress) {  // reward address is address that will get the reward
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        console.log('aaaa' + this.getLatestBlock().hash);
        //block.transactions = this.pendingTransactions;// we sent all pending transactions just for this simple module but in real blockchain world usually not possible because there is alot of transactions and the block size is just 4 bytes
        block.mineBlock(this.difficulty);
        console.log("Block Successfully mined");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, rewardAddress, this.miningReward), //null because there is no from address
        ];
    }



    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must have fromAddress and toAddress');
        }

        if (!transaction.isValid()) {
            throw new Error('Can\'t add invalid transaction to the chain');
        }

        this.pendingTransactions.push(transaction);
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock.hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    isChainValid() {

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            console.log('validation');
            if (!currentBlock.hasValidTransactions()) {
                console.log('hasvalisd');
                return false;
            }

            if (currentBlock.hash !== currentBlock.calcHash()) {
                console.log('hash');
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log('revious hash');
                return false;
            }



        }
        return true;
    }
}

module.exports.BlockChain = BlockChain;
