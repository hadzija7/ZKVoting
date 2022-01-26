//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { SemaphoreClient } from './SemaphoreClient.sol';

contract VotingProcess is SemaphoreClient {
    uint id;
    string name;
    string description;
    string[] proposals;

    mapping (string => uint) votesPerProposal;
    string winningProposal;

    constructor(
        uint _id,
        string _name,
        string _description,
        string[] _proposals
    ){
        id = _id;
        name = _name;
        description = _description;
        proposals = _proposals;
    }

    function vote(
        string signal,
        bytes memory _signal,
        uint256[8] memory _proof,
        uint256 _root,
        uint256 _nullifiersHash,
        uint232 _externalNullifier
    ) public {
        //check if signal matches one of proposals
        bool exist = false;
        for(uint i = 0; i < proposals.length; i ++){
            if (signal == proposals[i]){
                exist = true;
                break;
            }
        }
        require(exist == true, "You need to choose one of the voting options!");

        //vote
        broadcastSignal(
            _signal,
            _proof,
            _root,
            _nullifiersHash,
            _externalNullifier
        );


    }


}