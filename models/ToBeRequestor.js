'use strict';

const TTEntity = require('./TTEntity');

class ToBeRequestor extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    this.RequestorList = this.w3.addContract('RequestorList', environment.TraceToRequestorList.address, environment.TraceToRequestorList.abi);
  }
  apply(country, name, email, uriForMoreDetails, hashForMoreDetails){
    return this.w3.sendToContractbyIdx(this.RequestorList, 'addPendingRequestorPR', this.gasPrice*4, this.w3.getWalletAddress(), country, name, email, uriForMoreDetails, hashForMoreDetails);
  }
  getStatus(){
    return this.w3.callContractbyIdx(this.RequestorList, 'isRequestorPR', this.w3.getWalletAddress());
  }

  getRequestorEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(this.RequestorList, fromBlock);
  }
}

module.exports = ToBeRequestor;