'use strict';

const tracetoWeb3 = require('tracetoio-eth-lib');

class TTEntity {
  constructor(name, priKey) {
    this.name = name;
    switch(process.env.NODE_ENV){
      case 'local':
      case 'dev':
      case 'beta':
        this.provider = 'wss://ropsten.infura.io/ws';
        this.httpProvider = 'https://ropsten.infura.io/'+process.env.INFURA_KEY;
        break;
      case 'app':
      default:
        this.provider = 'wss://mainnet.infura.io/ws';
        this.httpProvider = 'https://mainnet.infura.io/'+process.env.INFURA_KEY;
    }
    this.priKey = priKey;
    
    this.w3 = new tracetoWeb3(this.provider);
    this.w3.setWallet(priKey);

    this.t2tContract = this.w3.addContract('t2t', environment.TraceToToken.address, environment.TraceToToken.abi);
    this.gasPrice = 1;
  }
  getName(){
    return this.name;
  }
  getGasPrice(){
    return this.w3.getGasPrice();
  }
  updateGasPrice(_gasPrice){
    this.gasPrice = _gasPrice;
  }
  approveToken(receiver, amount) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      //Creating a new instance of httpw3 provider to ensure that there is a connection.
      const httpw3 = new tracetoWeb3(_this.httpProvider);
      httpw3.setWallet(_this.priKey);
      const t2tContract = httpw3.addContract('t2t', environment.TraceToToken.address, environment.TraceToToken.abi);
      httpw3.sendToContractbyIdx(t2tContract, 'approve', _this.gasPrice*4, receiver, amount)
      .then(data => resolve(data), reason => reject(reason));
    });
  }
}

module.exports = TTEntity;