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
async function startFlow(){
  try{
    await helper.initialize();
    await helper.checkBalance();
    await helper.checkRMIBalance();
    await helper.approveSCContract();
    await helper.topup();
    await helper.approveRMISCContract();
    await helper.rmiTopup();
    await helper.checkBalance();
    await helper.checkRMIBalance();
    await helper.setPending();
    await helper.setResult();
    await helper.getResult();
    await helper.setFinished();
    await helper.setRMIPending();
    await helper.setRMIResult();
    await helper.getRMIResult();
    await helper.setRMIFinished();
    await helper.checkBalance();
    await helper.checkRMIBalance();
    process.exit(0);
  }catch(err){
    console.error(err);
    process.exit(1);
  }
}

startFlow();