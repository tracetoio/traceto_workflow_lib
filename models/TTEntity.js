"use strict";

const traceto_web3 = require("tracetoio-eth-lib")

class TTEntity {
	constructor(name, priKey) {
		this.name = name;
		this.w3 = new traceto_web3("wss://ropsten.infura.io/ws");
		this.w3.setWallet(priKey);
		this.t2tContract = this.w3.addContract('t2t', environment.TraceToToken.address, environment.TraceToToken.abi);
		this.gasPrice = 1;
		
	}
	getName(){
		return this.name;
	}
	getGasPrice(){
		return this.w3.getGasPrice();
	}
	updateGasPrice(_gasPrice){
		this.gasPrice = _gasPrice;
	}
	approveToken(receiver, amount, callback) {
		return this.w3.sendToContractbyIdx(this.t2tContract, "approve", this.gasPrice*4, callback, receiver, amount);
	}
}

module.exports = TTEntity;