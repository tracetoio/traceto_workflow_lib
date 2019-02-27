'use strict';

const TTEntity = require('./TTEntity');

class ServiceProvider extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    
    this.ServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToServiceCredit.address, environment.TraceToServiceCredit.abi);
    this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
  }
  addResultContract(name, addr){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.addContract(name, addr, environment.TraceToProfileResult.abi)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getPubKey(contractIdx){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(contractIdx, 'getPubKey')
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  setResultForProfile(contractIdx, profileId, result, decay, expire){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(contractIdx, 'setResult', _this.gasPrice*4, profileId, result, decay, expire)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getProfile(profileId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileContract, 'getProfile', profileId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getPendingEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(this.ServiceCreditContract, fromBlock);
  }
  sign(msg){
    return this.w3.sign(msg);
  }
}

module.exports = ServiceProvider;