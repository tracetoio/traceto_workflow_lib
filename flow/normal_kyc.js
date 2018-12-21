const async = require('async');
const helper = require('./helper');

/*
* This flow is the demo flow for sending a normal kyc request by requestor.
*
* Requestor need to top up for getting enough balance, set the profile as 
* pending, wait the service provider to set KYC result, and then set the 
* profile as KYC finished.
*/
function startFlowTests(){
  console.log('Flow started.');
  async.waterfall([
    helper.checkBalance,
    helper.approveSCContract,
    helper.topup,
    helper.checkBalance,
    helper.setPending,
    helper.setResult,
    helper.getResult,
    helper.setFinished,
    helper.checkBalance
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