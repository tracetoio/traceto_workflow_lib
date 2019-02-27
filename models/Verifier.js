'use strict';

const TTEntity = require('./TTEntity');

const tracetoWeb3 = require('tracetoio-eth-lib');

class Verifier extends TTEntity {
  constructor(name, priKey, threshold) {
    super(name, priKey);
    this.threshold = threshold;
    this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
    this.UnlockProfileContract = this.w3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);  
  }

  addProfile(user, profile, ipfs){
    const _this = this;
    return new Promise(function(resolve, reject) {
      //Creating a new instance of httpw3 provider to ensure that there is a connection.
      const httpw3 = new tracetoWeb3(_this.httpProvider);
      httpw3.setWallet(_this.priKey);
      const profileContract = httpw3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
      httpw3.sendToContractbyIdx(profileContract, 'assignProfileToken', _this.gasPrice*4, user, profile, ipfs)
      .then(data => resolve(data), reason => reject(reason));
    });
  }

  shareKey(profileHash, keyPiece, requestor){
    const _this = this;
    return new Promise(function(resolve, reject) {
      //Creating a new instance of httpw3 provider to ensure that there is a connection.
      const httpw3 = new tracetoWeb3(_this.httpProvider);
      httpw3.setWallet(_this.priKey);
      const unlockProfileContract = httpw3.addContract('UnlockProfile', environment.TraceToUnlockProfile.address, environment.TraceToUnlockProfile.abi);  
      httpw3.sendToContractbyIdx(unlockProfileContract, 'setKey', _this.gasPrice*4, profileHash, keyPiece, requestor)
      .then(data => resolve(data), reason => reject(reason));
    });
  }

  getProfileCount(user){
    const _this = this;
    return new Promise(function(resolve, reject) {
      this.w3.callContractbyIdx(this.ProfileContract, 'getUserProfileTokenCount', user)
      .then(data => resolve(data), reason => reject(reason));
    });
  }

  getProfileContractOwner(){
    const _this = this;
    return new Promise(function(resolve, reject) {
      this.w3.callContractbyIdx(this.ProfileContract, 'owner')
      .then(data => resolve(data), reason => reject(reason));
    });
  }

  getUnlockProfileReason(profileHash, requestor){
    const _this = this;
    return new Promise(function(resolve, reject) {
      this.w3.callContractbyIdx(this.UnlockProfileContract, 'getReason', profileHash, requestor)
      .then(data => resolve(data), reason => reject(reason));
    });  
  }
}

module.exports = Verifier;
