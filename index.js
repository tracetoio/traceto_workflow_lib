"use strict";

const request = require('sync-request');
const token_url = 'https://s3-ap-southeast-1.amazonaws.com/contracts.traceto.io/dev/Token.environment.version_latest.json';
const contracts_url = 'https://s3-ap-southeast-1.amazonaws.com/contracts.traceto.io/dev/Contract.environment.version_latest.json';

let contracts = JSON.parse(request('GET', contracts_url).getBody());
contracts.TraceToContracts.push(JSON.parse(request('GET', token_url).getBody()));

global.environment = {};

contracts.TraceToContracts.forEach(function(contract){
	environment[contract.name] = {
		address: contract.address,
		abi: contract.abi
	};
});

const User = require('./models/User');
const Requestor = require('./models/Requestor');
const ToBeRequestor = require('./models/ToBeRequestor');
const ServiceProvider = require('./models/ServiceProvider');
const RMIServiceProvider = require('./models/RMIServiceProvider');
const ToBeServiceProvider = require('./models/ToBeServiceProvider');
const ToBeRMIServiceProvider = require('./models/ToBeRMIServiceProvider');
const Verifier = require('./models/Verifier');

module.exports = {
	User: User,
	Requestor: Requestor,
	ServiceProvider: ServiceProvider,
	RMIServiceProvider: RMIServiceProvider,
	ToBeRequestor: ToBeRequestor,
	ToBeServiceProvider: ToBeServiceProvider,
	ToBeRMIServiceProvider: ToBeRMIServiceProvider,
	Verifier: Verifier
};