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
    return this.w3.callContractbyIdx(this.ProfileContract, 'getProfile', profileId);
  }
  getSPList(){
    return this.w3.callContractbyIdx(this.SPListContract, 'getSPList');
  }
  getRMISPList(){
    return this.w3.callContractbyIdx(this.RMISPListContract, 'getSPList');
  }
  topup(sp, count){
    return this.w3.sendToContractbyIdx(this.ServiceCreditContract, 'topup', this.gasPrice*4, this.prContract, sp, count);
  }
  topupRMI(sp, count){
    return this.w3.sendToContractbyIdx(this.RMIServiceCreditContract, 'topup', this.gasPrice*4, this.prContract, sp, count);
  }
  assignKYCToken(profile, result, decay){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'assignKYCToken', this.gasPrice*4, profile, result, decay);
  }
  getBalance(sp){
    return this.w3.callContractbyIdx(this.ProfileResultContract, 'getServiceBalance', sp);
  }
  getRMIBalance(sp){
    return this.w3.callContractbyIdx(this.ProfileResultContract, 'getRMIServiceBalance',sp);
  }
  setPendingForProfile(profileId, consent){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'addPending', this.gasPrice*4, profileId, consent);
  }
  setRMIPendingForProfile(profileId){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'addRMIPending', this.gasPrice*4, profileId);
  }
  getResultForProfile(profileId, sp){
    return this.w3.callContractbyIdx(this.ProfileResultContract, 'getResult', profileId, sp);
  }
  getRMIResultForProfile(profileId, sp){
    return this.w3.callContractbyIdx(this.ProfileResultContract, 'getRMIResult', profileId, sp);
  }
  setFinishedForProfile(profileId, sp){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'setFinished', this.gasPrice*4, profileId, sp);
  }
  setRMIFinishedForProfile(profileId, sp){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'setRMIFinished', this.gasPrice*4, profileId, sp);
  }
  setUnlockForProfile(profileId, reason){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'requestProfileKey', this.gasPrice*4, profileId, reason);
  }
  getProfileKeys(profileId, idx){
    return this.w3.callContractbyIdx(this.ProfileResultContract, 'getProfileKey', profileId, idx);
  }
  emitRENEWForProfile(profileId){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'emitRENEW', this.gasPrice*4, profileId);
  }
  emitRMIForProfile(profileId){
    return this.w3.sendToContractbyIdx(this.ProfileResultContract, 'emitRMI', this.gasPrice*4, profileId);
  }
  getResultEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(this.ProfileResultContract, fromBlock);
  }
  getKYCTokens(profileId){
    return this.w3.callContractbyIdx(this.ProfileContract, 'getProfileKYCs', profileId);
  }
  getKYCTokenData(kycId){
    return this.w3.callContractbyIdx(this.ProfileContract, 'getKYC', kycId);
  }
  getProfileCount(user){
    return this.w3.callContractbyIdx(this.ProfileContract, 'getUserProfileTokenCount', user);
  }
  sign(msg){
    return this.w3.sign(msg);
  }
}

module.exports = Requestor;