const async = require('async');
const helper = require('./helper');

/*
* This flow is the demo flow for unlocking a profile by requestor.
*
* After the normal KYC flow, if the requestor need to unlock the 
* profile because of the regulations, he needs to request to unlock
* the profile. Once verifiers verified the reason of this unlocking 
* request, they can share the key piece encrypted by requestor 
* public key, and then requestor can read it, decrypt it and combine
* into the original key.
*/

function startFlowTests(){
  console.log('Flow started.');
  //create our users
  async.waterfall([
    helper.checkBalance,
    helper.checkRMIBalance,
    helper.requestUnlock,
    helper.shareUnlockKey,
    helper.getUnlockKey
  ],function(err, ...results) {
    console.log(...results);
  }
  );
}

async.waterfall([
  helper.initialize,
  startFlowTests
],function(err, ...results) {
  console.log(...results);
}
);