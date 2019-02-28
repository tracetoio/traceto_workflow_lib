global.settings = require('./settings');
const workflow = require('../index');

environment.TraceToProfileResult.address = settings.values.prContract;

exports.initialize = async function(){
  console.log('Initialize started.');
  /*
  * Alice is an end user.
  * Bob is a requestor.
  * Carol is a normal service provider.
  * Dave is a RMI service provider.
  * Eve is a tier 3 verifier.
  */
  this.alice = new workflow.User('Alice', settings.keys.users[0].priKey);
  this.bob = new workflow.Requestor('Bob', settings.keys.requestors[0].priKey, environment.TraceToProfileResult.address);
  this.carol = new workflow.ServiceProvider('Carol', settings.keys.serviceProviders[0].priKey);
  this.dave = new workflow.RMIServiceProvider('Dave', settings.keys.serviceProviders[1].priKey);
  this.eve = new workflow.Verifier('Eve', settings.keys.verifiers[0].priKey);

  this.carolToBob = this.carol.addResultContract('Bob', environment.TraceToProfileResult.address);
  this.daveToBob = this.dave.addResultContract('Bob', environment.TraceToProfileResult.address);
  
  let gasPrice = await this.alice.getGasPrice();
  this.alice.updateGasPrice(gasPrice);
  this.bob.updateGasPrice(gasPrice);
  this.carol.updateGasPrice(gasPrice);
  this.dave.updateGasPrice(gasPrice);
  this.eve.updateGasPrice(gasPrice);
  console.log('Initialize finished.');
  
};

exports.checkBalance = async function(){
  console.log('Checking balance:');
  let data = await this.bob.getBalance(this.carol.w3.getWalletAddress());
  console.log("tokenCount  ", data.tokenCount);
  console.log("serviceCount", data.serviceCount);
};

exports.checkRMIBalance = async function(){
  console.log('Checking rmi balance:');
  let data = await this.bob.getRMIBalance(this.dave.w3.getWalletAddress());
  console.log("tokenCount  ", data.tokenCount);
  console.log("serviceCount", data.serviceCount);
};

exports.approveSCContract = async function() {
  console.log('Approving T2T:');
  let data = await this.bob.approveToken(environment.TraceToServiceCredit.address, settings.values.rate*settings.values.topupCount);
  console.log(data.transactionHash);
};

exports.approveRMISCContract = async function() {
  console.log('Approving T2T:');
  let data = await this.bob.approveToken(environment.TraceToRMIServiceCredit.address, settings.values.rate*settings.values.topupCount)
  console.log(data.transactionHash);
};

exports.topup = async function(){
  console.log('Top up balance:');
  let data = await this.bob.topup(this.carol.w3.getWalletAddress(), settings.values.topupCount)
  console.log(data.transactionHash);
};

exports.rmiTopup = async function(){
  console.log('Top up rmi balance:');
  let data = await this.bob.topupRMI(this.dave.w3.getWalletAddress(), settings.values.topupCount)
  console.log(data.transactionHash);
};

exports.setPending = async function(){
  console.log('Set profile as pending:');
  let data = await this.bob.setPendingForProfile(settings.values.profileId, settings.values.consent)
  console.log(data.transactionHash);
};

exports.setRMIPending = async function(){
  console.log('Set profile as rmi pending:');
  let data = await this.bob.setRMIPendingForProfile(settings.values.profileId)
  console.log(data.transactionHash);
};


exports.setResult = async function(){
  console.log('Set profile result:');
  let data = await this.carol.setResultForProfile(this.carolToBob, settings.values.profileId, settings.values.result, settings.values.decay, settings.values.expire)
  console.log(data.transactionHash);
};


exports.setRMIResult = async function(){
  console.log('Set rmi profile result:');
  let data = await this.dave.setResultForProfile(this.daveToBob, settings.values.profileId, settings.values.result, settings.values.decay, settings.values.expire)
  console.log(data.transactionHash);
};

exports.getResult = async function(){
  console.log('Get result:');
  let data = await this.bob.getResultForProfile(settings.values.profileId, this.carol.w3.getWalletAddress());
  console.log(data);
};

exports.getRMIResult = async function(){
  console.log('Get RMI result:');
  let data = await this.bob.getRMIResultForProfile(settings.values.profileId, this.dave.w3.getWalletAddress());
  console.log(data);
};


exports.setFinished = async function(){
  console.log('Set profile as finished:');
  let data = await this.bob.setFinishedForProfile(settings.values.profileId, this.carol.w3.getWalletAddress())
  console.log(data.transactionHash);
};

exports.setRMIFinished = async function(){
  console.log('Set profile as rmi finished:');
  let data = await this.bob.setRMIFinishedForProfile(settings.values.profileId, this.dave.w3.getWalletAddress())
  console.log(data.transactionHash);
};

exports.requestUnlock = async function(){
  console.log('Request to Unlock Profile:');
  let data = await this.bob.setUnlockForProfile(settings.values.profileId, settings.values.reason)
  console.log(data.transactionHash);
};



exports.shareUnlockKey = async function(){
  console.log('Share the Unlock Profile:');
  for(let i = 0; i < 10; i++){
    console.log('Sharing Key '+i+':');
    let data = await this.eve.shareKey(settings.values.profileId, settings.values.keys[i], environment.TraceToProfileResult.address)
    console.log(data.transactionHash);
  }
};

exports.getUnlockKey = async function(){
  console.log('Request to Unlock Profile:');
  let data = await this.bob.getProfileKeys(settings.values.profileId, 0);
  console.log(data);
};
