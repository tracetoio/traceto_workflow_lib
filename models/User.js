'use strict';

const TTEntity = require('./TTEntity');

class User extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
    this.ServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToServiceCredit.address, environment.TraceToServiceCredit.abi);
  }

  addProfileResultContract(name, addr){
    return this.w3.addContract(name, addr, environment.TraceToProfileResult.abi);
  }

  getShareProfileEvents(contractIdx, fromBlock='latest'){
    //Consent and resultSet
    return this.w3.getAllContractEventbyId(contractIdx, fromBlock);
  }

  getProfileEvents(fromBlock='latest'){
    //SetProfile event
    return this.w3.getAllContractEventbyId(this.ProfileContract, fromBlock);
  }

  getProfileStatusEvents(fromBlock='latest'){
    //Topup, Pending, Finished events
    return this.w3.getAllContractEventbyId(this.ServiceCreditContract, fromBlock);
  }
}

module.exports = User;