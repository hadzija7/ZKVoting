//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract B {
    uint public stateB;
}

contract Test {
    uint public state;
    B b;

    function incrementState() public {
        state += 1;
    }

    constructor(uint s, B _b){
        state = s;
        b = _b;
    }
}