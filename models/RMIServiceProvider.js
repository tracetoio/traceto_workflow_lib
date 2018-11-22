"use strict";

const TTEntity = require('./TTEntity');

class RMIServiceProvider extends TTEntity {
	constructor(name, priKey) {
		super(name, priKey);
		
		this.ServiceCreditContract = this.w3.addContract('RMIServiceCredit', environment.TraceToRMIServiceCredit.address, environment.TraceToRMIServiceCredit.abi);
		this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
	}
	addResultContract(name, addr){
		return this.w3.addContract(name, addr, environment.TraceToProfileResult.abi);
	}
	getPubKey(contractIdx, callback){
		return this.w3.callContractbyIdx(contractIdx, "getPubKey", callback);
	}
	setResultForProfile(contractIdx, profileId, result, decay, expire, callback){
		return this.w3.sendToContractbyIdx(contractIdx, "setRMIResult", this.gasPrice*4, callback, profileId, result, decay, expire);
	}
	getProfile(profileId, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getProfile", callback, profileId);
	}
	getPendingEvents(){
		return this.w3.getAllContractEventbyId(this.ServiceCreditContract);
	}

	sign(msg){
		return this.w3.sign(msg);
	}
}

module.exports = RMIServiceProvider;