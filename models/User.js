"use strict";

const TTEntity = require('./TTEntity');

class User extends TTEntity {
	constructor(name, priKey) {
		super(name, priKey);
		this.ProfileContract = this.w3.addContract('Profile', environment.TraceToProfile.address, environment.TraceToProfile.abi);
		this.ServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToServiceCredit.address, environment.TraceToServiceCredit.abi);
	}

	addProfileResultContract(name, addr){
		return this.w3.addContract(name, addr, environment.TraceToProfileResult.abi);
	}

	getShareProfileEvents(contractIdx){
		//Consent and resultSet
		return this.w3.getAllContractEventbyId(contractIdx);
	}

	getProfileEvents(){
		//SetProfile event
		return this.w3.getAllContractEventbyId(this.ProfileContract);
	}

	getProfileStatusEvents(){
		//Topup, Pending, Finished events
		return this.w3.getAllContractEventbyId(this.ServiceCreditContract);
	}
}

module.exports = User;