"use strict";

const TTEntity = require('./TTEntity');

class Verifier extends TTEntity {
	constructor(name, priKey, threshold) {
		super(name, priKey);
		this.threshold = threshold;
		this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
		this.UnlockProfileContract = this.w3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);	
	}

	addProfile(user, profile, ipfs, callback){
		return this.w3.sendToContractbyIdx(this.ProfileContract, "assignProfileToken", this.gasPrice*4, callback, user, profile, ipfs);
	}

	shareKey(profileHash, keyPiece, requestor, callback){
		return this.w3.sendToContractbyIdx(this.UnlockProfileContract, "setKey", this.gasPrice*4, callback, profileHash, keyPiece, requestor);
	}

	getProfileCount(user, callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "getUserProfileTokenCount", callback, user);
	}

	getProfileContractOwner(callback){
		return this.w3.callContractbyIdx(this.ProfileContract, "owner", callback);
	}

	getUnlockProfileReason(profileHash, requestor, callback){
		return this.w3.callContractbyIdx(this.UnlockProfileContract, "getReason", callback, profileHash, requestor);	
	}
}

module.exports = Verifier;