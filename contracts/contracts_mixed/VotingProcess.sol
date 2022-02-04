//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { Semaphore } from './Semaphore.sol';

contract VotingProcess{
    uint public id;
    string public name;
    string public description;
    bytes[] public proposals;

    mapping (bytes => uint) votesPerProposal;
    bytes winningProposal;

    function getProposals() view public returns (bytes[] memory){
        return proposals;
    }

    constructor(
        uint _id,
        string memory _name,
        string memory _description,
        bytes[] memory _proposals
    ){
        id = _id;
        name = _name;
        description = _description;
        proposals = _proposals;
    }
}