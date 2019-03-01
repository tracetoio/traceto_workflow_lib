global.settings = require('./settings');
const workflow = require('../index');

environment.TraceToProfileResult.address = settings.values.prContract;

exports.initialize = function(outerCallback){
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
  
  this.alice.getGasPrice().then(gasPrice => {
    this.alice.updateGasPrice(gasPrice);
    this.bob.updateGasPrice(gasPrice);
    this.carol.updateGasPrice(gasPrice);
    this.dave.updateGasPrice(gasPrice);
    this.eve.updateGasPrice(gasPrice);
    console.log('Initialize finished.');
    outerCallback();
  });
};

exports.checkBalance = function(outerCallback){
  console.log('Checking balance:');
  this.bob.getBalance(this.carol.w3.getWalletAddress(), function(err, res){
    console.log('    token balance: ', res.tokenCount);
    console.log('    service balance: ', res.serviceCount);
    outerCallback();
  });
};

exports.checkRMIBalance = function(outerCallback){
  console.log('Checking rmi balance:');
  this.bob.getRMIBalance(this.dave.w3.getWalletAddress(), function(err, res){
    console.log('    rmi token balance: ', res.tokenCount);
    console.log('    rmi service balance: ', res.serviceCount);
    outerCallback();
  });
};

exports.approveSCContract = function(outerCallback) {
  console.log('Approving T2T:');
  this.bob.approveToken(environment.TraceToServiceCredit.address, settings.values.rate*settings.values.topupCount, null)
  .then(function(receipt){
    console.log('    Approvd '+receipt);
    outerCallback();
  });
};

exports.approveRMISCContract = function(outerCallback) {
  console.log('Approving T2T:');
  this.bob.approveToken(environment.TraceToRMIServiceCredit.address, settings.values.rate*settings.values.topupCount, null)
  .then(function(receipt){
    console.log('    Approvd '+receipt);
    outerCallback();
  });
};

exports.topup = function(outerCallback){
  console.log('Top up balance:');
  this.bob.topup(this.carol.w3.getWalletAddress(), settings.values.topupCount, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

exports.rmiTopup = function(outerCallback){
  console.log('Top up rmi balance:');
  this.bob.topupRMI(this.dave.w3.getWalletAddress(), settings.values.topupCount, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

exports.setPending = function(outerCallback){
  console.log('Set profile as pending:');
  this.bob.setPendingForProfile(settings.values.profileId, settings.values.consent, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

exports.setRMIPending = function(outerCallback){
  console.log('Set profile as rmi pending:');
  this.bob.setRMIPendingForProfile(settings.values.profileId, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};


exports.setResult = function(outerCallback){
  console.log('Set profile result:');
  this.carol.setResultForProfile(this.carolToBob, settings.values.profileId, settings.values.result, settings.values.decay, settings.values.expire, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};


exports.setRMIResult = function(outerCallback){
  console.log('Set rmi profile result:');
  this.dave.setResultForProfile(this.daveToBob, settings.values.profileId, settings.values.result, settings.values.decay, settings.values.expire, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

exports.getResult = function(outerCallback){
  console.log('Get result:');
  this.bob.getResultForProfile(settings.values.profileId, this.dave.w3.getWalletAddress(), (err, res)=>{
    if(!err){
      console.log('    Done '+res);
      outerCallback();
    }
  });
};

exports.setFinished = function(outerCallback){
  console.log('Set profile as finished:');
  this.bob.setFinishedForProfile(settings.values.profileId, this.carol.w3.getWalletAddress(), null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

exports.setRMIFinished = function(outerCallback){
  console.log('Set profile as rmi finished:');
  this.bob.setRMIFinishedForProfile(settings.values.profileId, this.dave.w3.getWalletAddress(), null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

exports.requestUnlock = function(outerCallback){
  console.log('Request to Unlock Profile:');
  this.bob.setUnlockForProfile(settings.values.profileId, settings.values.reason, null)
  .then(function(receipt){
    console.log('    Done '+receipt);
    outerCallback();
  });
};

function shareKey(idx, callback){
  if(idx > 10){
    console.log('    Key Sharing Done');
    callback();
  }else{
    console.log('    Sharing Key '+idx+':');
    this.eve.shareKey(settings.values.profileId, settings.values.keys[idx], environment.TraceToProfileResult.address, null)
    .then(function(receipt){
      console.log('       Done '+receipt);
      shareKey(idx+1, callback);
    });
  }
}

exports.shareUnlockKey = function(outerCallback){
  console.log('Share the Unlock Profile:');
  shareKey(0, outerCallback);
};

exports.getUnlockKey = function(outerCallback){
  console.log('Request to Unlock Profile:');
  this.bob.getProfileKeys(settings.values.profileId, 0, (err, res)=>{
    if(!err){
      console.log(res);
      console.log('    Done');
      outerCallback();
    }
  });
};
