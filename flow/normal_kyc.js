const helper = require('./helper');

/*
* This flow is the demo flow for sending a normal kyc request by requestor.
*
* Requestor need to top up for getting enough balance, set the profile as 
* pending, wait the service provider to set KYC result, and then set the 
* profile as KYC finished.
*/
async function startFlow(){
  await helper.initialize();
  await helper.checkBalance();
  await helper.approveSCContract();
  await helper.topup();
  await helper.checkBalance();
  await helper.setPending();
  await helper.setResult();
  await helper.getResult();
  await helper.setFinished();
  await helper.checkBalance();
}

startFlow();