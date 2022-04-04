const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calcHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }
    signTransaction(signingKey){
        const transactionHash = this.calcHash();
        const sig = signingKey.sign(transactionHash,'base64');
        this.signature = sig.toDER('hex');   //settign signature for the transaction
    }

    isValid(){
        if(this.fromAddress === null) return true;
        
        if(!this.signature || this.signature === 0){ //check if there is a signature
            throw new Error('This transaction doesn\'t have a signature!');
        }
        //make sure that transaction assigned with correct key
        const publicKey = ec.keyFromPublic(this.fromAddress,'hex'); //extract public key
        return publicKey.verify(this.calcHash(),this.signature); //verify transcation have been signed with the key and not changed
    }
}

module.exports.Transaction = Transaction;