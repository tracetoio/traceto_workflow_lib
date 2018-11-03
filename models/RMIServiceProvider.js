"use strict";

const TTEntity = require('./TTEntity');

class RMIServiceProvider extends TTEntity {
	constructor(name, priKey) {
		super(name, priKey);
		
		this.ServiceCreditContract = this.w3.addContract('RMIServiceCredit', environment.TraceToRMIServiceCredit.address, environment.TraceToRMIServiceCredit.abi);
		this.ProfileContract = this.w3.addContract('Profile', environment.TraceToProfile.address, environment.TraceToProfile.abi);
	}
	addResultContract(name, addr){
		return this.w3.addContract(name, addr, environment.TraceToProfileResult.abi);
	}
	getPubKey(contractIdx, callback){
		return this.w3.callContractbyIdx(contractIdx, "getPubKey", callback);
	}
	setResultForProfile(contractIdx, profileHash, result, decay, expire, callback){
		return this.w3.sendToContractbyIdx(contractIdx, "setRMIResult", this.gasPrice*4, callback, profileHash, result, decay, expire);
	}
	getProfileIPFS(profile, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getIPFSLink", callback, profile);
	}
	getPendingEvents(){
		return this.w3.getAllContractEventbyId(this.ServiceCreditContract);
	}

	sign(msg){
		return this.w3.sign(msg);
	}
}

module.exports = RMIServiceProvider;