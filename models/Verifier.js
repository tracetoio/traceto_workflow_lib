'use strict';

const TTEntity = require('./TTEntity');

const tracetoWeb3 = require('tracetoio-eth-lib');

class Verifier extends TTEntity {
  constructor(name, priKey, threshold) {
    super(name, priKey);
    this.threshold = threshold;
    this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
    this.UnlockProfileContract = this.w3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);  
    this.SPListContract = this.w3.addContract('ServiceProviderList', environment.TraceToSPList.address, environment.TraceToSPList.abi);
    this.RMISPListContract = this.w3.addContract('RMIServiceProviderList', environment.TraceToRMISPList.address, environment.TraceToRMISPList.abi);
  }

  addProfile(user, profile, ipfs){
      //Creating a new instance of httpw3 provider to ensure that there is a connection.
      const httpw3 = new tracetoWeb3(this.httpProvider);
      httpw3.setWallet(this.priKey);
      const profileContract = httpw3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
      return httpw3.sendToContractbyIdx(profileContract, 'assignProfileToken', this.gasPrice*4, user, profile, ipfs);
  }

  shareKey(profileHash, keyPiece, requestor){
    //Creating a new instance of httpw3 provider to ensure that there is a connection.
      const httpw3 = new tracetoWeb3(this.httpProvider);
      httpw3.setWallet(this.priKey);
      const unlockProfileContract = httpw3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);  
      return httpw3.sendToContractbyIdx(unlockProfileContract, 'setKey', this.gasPrice*4, profileHash, keyPiece, requestor);
  }

  getProfileCount(user){
    return this.w3.callContractbyIdx(this.ProfileContract, 'getUserProfileTokenCount', user);
  }

  getProfileContractOwner(){
    return this.w3.callContractbyIdx(this.ProfileContract, 'owner');
  }

  getUnlockProfileReason(profileHash, requestor){
    return this.w3.callContractbyIdx(this.UnlockProfileContract, 'getReason', profileHash, requestor);
  }

  isSP(address){
    return this.w3.callContractbyIdx(this.SPListContract, 'isSP', address);
  }

  isRMISP(address){
    return this.w3.callContractbyIdx(this.RMISPListContract, 'isSP', address);
  }
}

module.exports = Verifier;
