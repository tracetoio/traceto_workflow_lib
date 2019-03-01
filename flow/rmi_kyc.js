const async = require('async');

const helper = require('./helper');

/*
* This flow is the demo flow for sending a RMI kyc request by requestor.
*
* RMI is request for more information.
*
* Based on the normal KYC flow, requestor needs to set the profile as RMI
* pending after he finished the normal KYC, wait for the rmi result to be
* set by RMI service provider, and set the RMI process is finished.
*/
function startFlowTests(){
  console.log('Flow started.');
  //create our users
  async.waterfall([
    helper.checkBalance,
    helper.checkRMIBalance,
    helper.approveSCContract,
    helper.topup,
    helper.approveRMISCContract,
    helper.rmiTopup,
    helper.checkBalance,
    helper.checkRMIBalance,
    helper.setPending,
    helper.setResult,
    helper.setFinished,
    helper.setRMIPending,
    helper.setRMIResult,
    helper.setRMIFinished,
    helper.checkBalance,
    helper.checkRMIBalance
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