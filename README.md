# microblock

Simple 140 Character Messages On The Ethereum Blockchain

## About

This project's goal is to start a microblogging ecosystem on top of the blockchain in the simplest way possible.

The hypothesis is that you (initially) just need to enable publishing events containing text. The rest can be added later.

If you need more functionality, take a look at [EtherTweet][1].

## Develop

### Compile contract

echo "var mbCompiled=`solc --optimize --combined-json abi,bin,interface microblock.sol`" > microblock.js

### Run tests

```js
// within geth console
loadScript("microblock_test.js");
```

[1]: http://ethertweet.net/
