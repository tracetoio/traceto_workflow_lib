global.settings = require('./settings');
const workflow = require('../index');

environment.TraceToProfileResult.address = settings.values.prContract;
console.log([environment])


exports.initialize = function(outer_callback){
	console.log("Initialize started.")
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

	this.carolToBob = this.carol.addResultContract("Bob", environment.TraceToProfileResult.address);
	this.daveToBob = this.dave.addResultContract("Bob", environment.TraceToProfileResult.address);
	
	this.alice.getGasPrice().then(gasPrice => {
		this.alice.updateGasPrice(gasPrice);
		this.bob.updateGasPrice(gasPrice);
		this.carol.updateGasPrice(gasPrice);
		this.dave.updateGasPrice(gasPrice);
		this.eve.updateGasPrice(gasPrice);
		console.log("Initialize finished.");
		outer_callback();
	});
}

exports.checkBalance = function(outer_callback){
	console.log("Checking balance:");
	this.bob.getBalance(this.carol.w3.getWalletAddress(), function(err, res){
		console.log("    token balance: ", res.tokenCount);
		console.log("    service balance: ", res.serviceCount);
		outer_callback();
	});
}

exports.checkRMIBalance = function(outer_callback){
	console.log("Checking rmi balance:");
	this.bob.getRMIBalance(this.dave.w3.getWalletAddress(), function(err, res){
		console.log("    rmi token balance: ", res.tokenCount);
		console.log("    rmi service balance: ", res.serviceCount);
		outer_callback();
	});
}

exports.approveSCContract = function(outer_callback) {
	console.log("Approving T2T:");
	this.bob.approveToken(environment.TraceToServiceCredit.address, settings.values.rate*settings.values.topupCount, null)
	.then(function(receipt){
		console.log("    Approvd");
		outer_callback();
	});
}

exports.approveRMISCContract = function(outer_callback) {
	console.log("Approving T2T:");
	this.bob.approveToken(environment.TraceToRMIServiceCredit.address, settings.values.rate*settings.values.topupCount, null)
	.then(function(receipt){
		console.log("    Approvd");
		outer_callback();
	});
}

exports.topup = function(outer_callback){
	console.log("Top up balance:");
	this.bob.topup(this.carol.w3.getWalletAddress(), settings.values.topupCount, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}

exports.rmiTopup = function(outer_callback){
	console.log("Top up rmi balance:");
	this.bob.topupRMI(this.dave.w3.getWalletAddress(), settings.values.topupCount, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}

exports.setPending = function(outer_callback){
	console.log("Set profile as pending:");
	this.bob.setPendingForProfile(settings.values.profileId, settings.values.consent, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}

exports.setRMIPending = function(outer_callback){
	console.log("Set profile as rmi pending:");
	this.bob.setRMIPendingForProfile(settings.values.profileId, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}


exports.setResult = function(outer_callback){
	console.log("Set profile result:");
	this.carol.setResultForProfile(this.carolToBob, settings.values.profileId, settings.values.result, settings.values.decay, settings.values.expire, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}


exports.setRMIResult = function(outer_callback){
	console.log("Set rmi profile result:");
	this.dave.setResultForProfile(this.daveToBob, settings.values.profileId, settings.values.result, settings.values.decay, settings.values.expire, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}

exports.getResult = function(outer_callback){
	console.log("Get result:");
	this.bob.getResultForProfile(settings.values.profileId, this.dave.w3.getWalletAddress(), (err, res)=>{
		if(!err){
			console.log("    Done");
			outer_callback();
		}
	})
}

exports.setFinished = function(outer_callback){
	console.log("Set profile as finished:");
	this.bob.setFinishedForProfile(settings.values.profileId, this.carol.w3.getWalletAddress(), null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}

exports.setRMIFinished = function(outer_callback){
	console.log("Set profile as rmi finished:");
	this.bob.setRMIFinishedForProfile(settings.values.profileId, this.dave.w3.getWalletAddress(), null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}



exports.requestUnlock = function(outer_callback){
	console.log("Request to Unlock Profile:");
	this.bob.setUnlockForProfile(settings.values.profileId, settings.values.reason, null)
	.then(function(receipt){
		console.log("    Done");
		outer_callback();
	});
}

function shareKey(idx, callback){
	if(idx > 10){
		console.log("    Key Sharing Done");
		callback();
	}else{
		console.log("    Sharing Key "+idx+":");
		this.eve.shareKey(settings.values.profileId, settings.values.keys[idx], environment.TraceToProfileResult.address, null)
		.then(function(receipt){
			console.log("       Done");
			shareKey(idx+1, callback);
		});
	}
}

exports.shareUnlockKey = function(outer_callback){
	console.log("Share the Unlock Profile:");
	shareKey(0, outer_callback);
}

exports.getUnlockKey = function(outer_callback){
	console.log("Request to Unlock Profile:");
	this.bob.getProfileKeys(settings.values.profileId, 0, (err, res)=>{
		if(!err){
			console.log(res);
			console.log("    Done");
			outer_callback();
		}
	});
}
