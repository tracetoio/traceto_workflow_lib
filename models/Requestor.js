"use strict";

const TTEntity = require('./TTEntity');

class Requestor extends TTEntity {
	constructor(name, priKey, prContract) {
		super(name, priKey);
		this.prContract = prContract;
		this.SPListContract = this.w3.addContract('SPList', environment.TraceToSPList.address, environment.TraceToSPList.abi);
		this.RMISPListContract = this.w3.addContract('RMISPList', environment.TraceToRMISPList.address, environment.TraceToRMISPList.abi);
		this.ProfileContract = this.w3.addContract('Profile', environment.TraceToProfile.address, environment.TraceToProfile.abi);

		this.ProfileResultContract = this.w3.addContract('ProfileResult', prContract, environment.TraceToProfileResult.abi);
		this.ServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToServiceCredit.address, environment.TraceToServiceCredit.abi);
		this.RMIServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToRMIServiceCredit.address, environment.TraceToRMIServiceCredit.abi);
		this.UnlockProfileContract = this.w3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);
	}
	getProfileIPFS(profile, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getIPFSLink", callback, profile);
	}
	getSPList(callback){
		return this.w3.callContractbyIdx(this.SPListContract, "getSPList", callback);
	}
	getRMISPList(callback){
		return this.w3.callContractbyIdx(this.RMISPListContract, "getSPList", callback);
	}
	topup(sp, count, callback){
		return this.w3.sendToContractbyIdx(this.ServiceCreditContract, "topup", this.gasPrice*4, callback, this.prContract, sp, count);
	}
	topupRMI(sp, count, callback){
		return this.w3.sendToContractbyIdx(this.RMIServiceCreditContract, "topup", this.gasPrice*4, callback, this.prContract, sp, count);
	}
	getBalance(sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getServiceBalance", callback, sp);
	}
	getRMIBalance(sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getRMIServiceBalance", callback, sp); 
	}
	setPendingForProfile(profileHash, consent, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "addPending", this.gasPrice*4, callback, profileHash, consent);
	}
	setRMIPendingForProfile(profileHash, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "addRMIPending", this.gasPrice*4, callback, profileHash);
	}
	getResultForProfile(profileHash, sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getResult", callback, profileHash, sp);
	}
	getRMIResultForProfile(profileHash, sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getResult", callback, profileHash, sp);
	}
	setFinishedForProfile(profileHash, sp, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "setFinished", this.gasPrice*4, callback, profileHash, sp);
	}
	setRMIFinishedForProfile(profileHash, sp, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "setFinished", this.gasPrice*4, callback, profileHash, sp);
	}
	setUnlockForProfile(profileHash, reason, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "requestProfileKey", this.gasPrice*4, callback, profileHash, reason);
	}
	getProfileKeys(profileHash, idx, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getProfileKey", callback, profileHash, idx);
	}
	emitRENEWForProfile(profileHash, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "emitRENEW", this.gasPrice*4, callback, profileHash);
	}
	emitRMIForProfile(profileHash, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "emitRMI", this.gasPrice*4, callback, profileHash);
	}
	getResultEvents(){
		return this.w3.getAllContractEventbyId(this.ProfileResultContract);
	}
	sign(msg){
		return this.w3.sign(msg);
	}
}

module.exports = Requestor;