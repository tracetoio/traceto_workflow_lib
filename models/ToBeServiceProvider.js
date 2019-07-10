'use strict';

const TTEntity = require('./TTEntity');

class ToBeServiceProvider extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    this.SPListContract = this.w3.addContract('ServiceProviderList', environment.TraceToSPList.address, environment.TraceToSPList.abi);
  }
  apply(ratePerService, reputation, companyName, email, uriForRubrics, hashFroRubrics){
    return this.w3.sendToContractbyIdx(this.SPListContract, 'addPendingSP', this.gasPrice*4, this.w3.getWalletAddress(), ratePerService, reputation, companyName, email, uriForRubrics, hashFroRubrics);
  }
  getStatus(callback){
    return this.w3.callContractbyIdx(this.SPListContract, 'isSP', this.w3.getWalletAddress());
  }
  getRequestorEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(this.SPListContract, fromBlock);
  }
}

module.exports = ToBeServiceProvider;