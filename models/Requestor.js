'use strict';

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
  getProfile(profileId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileContract, 'getProfile', profileId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getSPList(){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.SPListContract, 'getSPList')
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getRMISPList(){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.RMISPListContract, 'getSPList')
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  topup(sp, count){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ServiceCreditContract, 'topup', _this.gasPrice*4, _this.prContract, sp, count)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  topupRMI(sp, count){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.RMIServiceCreditContract, 'topup', _this.gasPrice*4, _this.prContract, sp, count)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  assignKYCToken(profile, result, decay){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'assignKYCToken', _this.gasPrice*4, profile, result, decay)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getBalance(sp){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileResultContract, 'getServiceBalance', sp)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getRMIBalance(sp){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileResultContract, 'getRMIServiceBalance',sp)
      .then(data => resolve(data), reason => reject(reason)); 
    });
  }
  setPendingForProfile(profileId, consent){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'addPending', _this.gasPrice*4, profileId, consent)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  setRMIPendingForProfile(profileId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'addRMIPending', _this.gasPrice*4, profileId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getResultForProfile(profileId, sp){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileResultContract, 'getResult', profileId, sp)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getRMIResultForProfile(profileId, sp){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileResultContract, 'getRMIResult', profileId, sp)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  setFinishedForProfile(profileId, sp){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'setFinished', _this.gasPrice*4, profileId, sp)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  setRMIFinishedForProfile(profileId, sp){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'setRMIFinished', _this.gasPrice*4, profileId, sp)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  setUnlockForProfile(profileId, reason){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'requestProfileKey', _this.gasPrice*4, profileId, reason)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getProfileKeys(profileId, idx){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileResultContract, 'getProfileKey', profileId, idx)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  emitRENEWForProfile(profileId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'emitRENEW', _this.gasPrice*4, profileId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  emitRMIForProfile(profileId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.sendToContractbyIdx(_this.ProfileResultContract, 'emitRMI', _this.gasPrice*4, profileId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getResultEvents(fromBlock='latest'){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.getAllContractEventbyId(_this.ProfileResultContract, fromBlock)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getKYCTokens(profileId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileContract, 'getProfileKYCs', profileId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getKYCTokenData(kycId){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileContract, 'getKYC', kycId)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  getProfileCount(user){
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.w3.callContractbyIdx(_this.ProfileContract, 'getUserProfileTokenCount', user)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
  sign(msg){
    const _this = this;
    return this.w3.sign(msg);
  }
}

module.exports = Requestor;