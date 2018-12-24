"use strict";

const TTEntity = require('./TTEntity');

class ToBeRequestor extends TTEntity {
	constructor(name, priKey) {
		super(name, priKey);
		this.RequestorList = this.w3.addContract('RequestorList', environment.TraceToRequestorList.address, environment.TraceToRequestorList.abi);
	}
	apply(country, name, email, uriForMoreDetails, hashForMoreDetails, callback){
		return this.w3.sendToContractbyIdx(this.RequestorList, "addPendingRequestorPR", gasPrice*4, callback, this.w3.getWalletAddress(), country, name, email, uriForMoreDetails, hashForMoreDetails);

	}
	getStatus(callback){
		return this.w3.callContractbyIdx(this.RequestorList, "isRequestorPR", callback, this.w3.getWalletAddress());
	}

	getRequestorEvents(fromBlock='latest'){
		return this.w3.getAllContractEventbyId(this.RequestorList, fromBlock);
	}
}

module.exports = ToBeRequestor;