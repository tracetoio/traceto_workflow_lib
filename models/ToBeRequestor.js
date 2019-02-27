'use strict';

const TTEntity = require('./TTEntity');

class ToBeRequestor extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    this.RequestorList = this.w3.addContract('RequestorList', environment.TraceToRequestorList.address, environment.TraceToRequestorList.abi);
  }
  apply(country, name, email, uriForMoreDetails, hashForMoreDetails){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.RequestorList, 'addPendingRequestorPR', _this.gasPrice*4, _this.w3.getWalletAddress(), country, name, email, uriForMoreDetails, hashForMoreDetails)
        .then(data => resolve(data), reason => reject(reason));
    });
  }
  getStatus(){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.RequestorList, 'isRequestorPR', _this.w3.getWalletAddress())
      .then(data => resolve(data), reason => reject(reason));
    });
  }

  getRequestorEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(_this.RequestorList, fromBlock);
  }
}

module.exports = ToBeRequestor;