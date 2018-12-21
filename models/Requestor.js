"use strict";

const TTEntity = require('./TTEntity');

class Requestor extends TTEntity {
	constructor(name, priKey, prContract) {
		super(name, priKey);
		this.prContract = prContract;
		this.SPListContract = this.w3.addContract('SPList', environment.TraceToSPList.address, environment.TraceToSPList.abi);
		this.RMISPListContract = this.w3.addContract('RMISPList', environment.TraceToRMISPList.address, environment.TraceToRMISPList.abi);
		this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);

		this.ProfileResultContract = this.w3.addContract('ProfileResult', prContract, environment.TraceToProfileResult.abi);
		this.ServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToServiceCredit.address, environment.TraceToServiceCredit.abi);
		this.RMIServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToRMIServiceCredit.address, environment.TraceToRMIServiceCredit.abi);
		this.UnlockProfileContract = this.w3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);
	}
	getProfile(profileId, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getProfile", callback, profileId);
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
	assignKYCToken(profile, result, decay, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "assignKYCToken", this.gasPrice*4, callback, profile, result, decay);
	}
	getBalance(sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getServiceBalance", callback, sp);
	}
	getRMIBalance(sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getRMIServiceBalance", callback, sp); 
	}
	setPendingForProfile(profileId, consent, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "addPending", this.gasPrice*4, callback, profileId, consent);
	}
	setRMIPendingForProfile(profileId, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "addRMIPending", this.gasPrice*4, callback, profileId);
	}
	getResultForProfile(profileId, sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getResult", callback, profileId, sp);
	}
	getRMIResultForProfile(profileId, sp, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getRMIResult", callback, profileId, sp);
	}
	setFinishedForProfile(profileId, sp, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "setFinished", this.gasPrice*4, callback, profileId, sp);
	}
	setRMIFinishedForProfile(profileId, sp, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "setRMIFinished", this.gasPrice*4, callback, profileId, sp);
	}
	setUnlockForProfile(profileId, reason, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "requestProfileKey", this.gasPrice*4, callback, profileId, reason);
	}
	getProfileKeys(profileId, idx, callback){
		return this.w3.callContractbyIdx(this.ProfileResultContract, "getProfileKey", callback, profileId, idx);
	}
	emitRENEWForProfile(profileId, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "emitRENEW", this.gasPrice*4, callback, profileId);
	}
	emitRMIForProfile(profileId, callback){
		return this.w3.sendToContractbyIdx(this.ProfileResultContract, "emitRMI", this.gasPrice*4, callback, profileId);
	}
	getResultEvents(fromBlock='latest'){
		return this.w3.getAllContractEventbyId(this.ProfileResultContract, fromBlock);
	}
	getKYCTokens(profileId, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getProfileKYCs", callback, profileId);
	}
	getKYCTokenData(kycId, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getKYC", callback, kycId);
	}
	sign(msg){
		return this.w3.sign(msg);
	}
}

module.exports = Requestor;