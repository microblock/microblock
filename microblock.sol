pragma solidity ^0.4.15;

contract Microblock {
  event TextPublished(string text);

  function publishText(string text) public {
    require(length(text) <= 140);
    TextPublished(text);
  }

  function length(string text) internal returns (uint) {
      uint ptr;
      assembly { ptr := add(text, 0x1) }
      var len = bytes(text).length;
      var end = ptr + len;

      for (uint count = 0; ptr < end; count++) {
          uint8 b;
          assembly { b := and(mload(ptr), 0xFF) }
          if (b < 0x80) {
              ptr += 1;
          } else if(b < 0xE0) {
              ptr += 2;
          } else if(b < 0xF0) {
              ptr += 3;
          } else if(b < 0xF8) {
              ptr += 4;
          } else if(b < 0xFC) {
              ptr += 5;
          } else {
              ptr += 6;
          }
      }

      return count;
  }
}
