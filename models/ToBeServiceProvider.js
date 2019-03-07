'use strict';

const TTEntity = require('./TTEntity');

class ToBeServiceProvider extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    this.SPListContract = this.w3.addContract('ServiceProviderList', environment.TraceToSPList.address, environment.TraceToSPList.abi);
  }
  apply(ratePerService, reputation, companyName, email, uriForRubrics, hashFroRubrics){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.SPListContract, 'addPendingSP', _this.gasPrice*4, _this.w3.getWalletAddress(), ratePerService, reputation, companyName, email, uriForRubrics, hashFroRubrics)
        .then(data => resolve(data), reason => reject(reason));
    });
  }
  getStatus(callback){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.SPListContract, 'isSP', _this.w3.getWalletAddress())
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getRequestorEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(this.SPListContract, fromBlock);
  }
}

module.exports = ToBeServiceProvider;