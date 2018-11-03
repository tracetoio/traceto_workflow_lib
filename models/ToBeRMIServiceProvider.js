"use strict";

const TTEntity = require('./TTEntity');

class ToBeRMIServiceProvider extends TTEntity {
	constructor(name, priKey) {
		super(name, priKey);
		this.SPListContract = this.w3.addContract('ServiceProviderList', environment.TraceToRMISPList.address, environment.TraceToRMISPList.abi);
	}
	apply(ratePerService, reputation, companyName, email, uriForRubrics, hashFroRubrics, callback){
		return this.w3.sendToContractbyIdx(this.SPListContract, "addPendingSP", this.gasPrice*4, callback, this.w3.getWalletAddress(), ratePerService, reputation, companyName, email, uriForRubrics, hashFroRubrics);
	}
	getStatus(callback){
		return this.w3.callContractbyIdx(this.SPListContract, "isSP", callback, this.w3.getWalletAddress());
	}
	getRequestorEvents(){
		return this.w3.getAllContractEventbyId(this.SPListContract);
	}
}

module.exports = ToBeRMIServiceProvider;