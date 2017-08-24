# microblock

Simple 140 Character Texts On The Ethereum Blockchain

## About

This project's goal is to start a microblogging ecosystem on top of the blockchain in the simplest way possible.

The hypothesis is that you (initially) just need to enable publishing events containing text. The rest can be added later.

If you need more functionality, take a look at [EtherTweet][1].

## Compatibility

Twitter adds an extra normalization step to [counting characters][2]. Since this would be expensive on the Ethereum Blockchain, microblock does not normalize. This means in some cases a text will be too long for a microblock but not for a Tweet.

You can use the read-only `length` method before `publishText` to make sure that a text is short enough (`<= 140`) for a microblock.

## Develop

### Compile contract

```bash
echo "var mbCompiled=`solc --optimize --combined-json abi,bin,interface microblock.sol`" > microblock.js
```

### Run tests

```js
// within geth console
loadScript("microblock_test.js");
```

[1]: http://ethertweet.net/
[2]: https://dev.twitter.com/basics/counting-characters
