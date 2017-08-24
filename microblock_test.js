var testResults = {};

function test(){

  // define test helpers
  var
    assert = function(exp, msg) { if (!exp) { console.log("!!! " + msg); } },
    log = function(obj) { console.log(JSON.stringify(obj)); },
    sleep = function(blocks) { admin.sleepBlocks(blocks); },
    errors = [],
    events = [],
    password = "test_password",
    account = eth.accounts[0];

  // define tests
  var instanceTests = function(instance) {
    var text140 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    var text141 = text140 + "a";
    var textUni = "Unicode snowman ☃";
    var text140Uni = "☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃" +
      "☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃";
    var textReasonable = "This is probably a reasonable tweet 😄. #reasonable http://microblock.org";

    assert(instance.length(text140) == 140, "length method is broken");
    assert(instance.length(text141) == 141, "length method is broken");
    assert(instance.length(textUni) == 17, "length method is broken");
    assert(instance.length(text140Uni) == 140, "length method is broken");
    assert(instance.length(textReasonable) == 72, "length method is broken");

    var txPublished = instance.publishText.sendTransaction(text140, {from: account, gas: 200000});
    var txPublished2 = instance.publishText.sendTransaction(text141, {from: account, gas: 200000});
    var txPublished3 = instance.publishText.sendTransaction(textUni, {from: account, gas: 200000});
    var txPublished4 = instance.publishText.sendTransaction(text140Uni, {from: account, gas: 200000});
    var txPublished5 = instance.publishText.sendTransaction(textReasonable, {from: account, gas: 200000});
    sleep(2);
    var rcPublished = eth.getTransactionReceipt(txPublished);
    var rcPublished2 = eth.getTransactionReceipt(txPublished2);
    var rcPublished3 = eth.getTransactionReceipt(txPublished3);
    var rcPublished4 = eth.getTransactionReceipt(txPublished4);
    var rcPublished5 = eth.getTransactionReceipt(txPublished5);

    assert(rcPublished.gasUsed == 53222, "used gas changed to " + rcPublished.gasUsed);
    assert(rcPublished2.gasUsed == 200000, "used gas changed to " + rcPublished2.gasUsed);
    assert(rcPublished3.gasUsed == 27585, "used gas changed to " + rcPublished3.gasUsed);
    assert(rcPublished4.gasUsed == 84317, "used gas changed to " + rcPublished4.gasUsed);
    assert(rcPublished5.gasUsed == 39232, "used gas changed to " + rcPublished5.gasUsed);
  }

  // unlock account
  personal.unlockAccount(account, password);

  loadScript("microblock.js");
  var mbABI = JSON.parse(mbCompiled.contracts["microblock.sol:Microblock"].abi);
  var mbContract = eth.contract(mbABI);
  var mbInstance = mbContract.new({ from: eth.accounts[0], data: "0x" + mbCompiled.contracts["microblock.sol:Microblock"].bin, gas: 4700000},
    function (e, contract) {
      if (typeof contract.address !== 'undefined') {
        // watch events
        testResults["watcher"] = mbInstance.allEvents(
          function(err, ev) {
            if(err){
              errors.push(err);
              return;
            }
            events.push(ev);
          }
        );
        console.log('testing started');
        testResults["errors"] = errors;
        testResults["events"] = events;
        testResults["abi"] = mbABI;
        testResults["instance"] = mbInstance;
        instanceTests(mbInstance);
        console.log('testing done');
      }
    }
  );
}

try {
  test();
} catch(e) {
  console.log(e);
}
