//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { VotingProcess } from './VotingProcess.sol';

contract OneVote {
    mapping(uint => VotingProcess) public votingProcesses;
    uint processCounter;

    function createVotingProcess(
        string memory _name,
        string memory _description,
        string[] memory _proposals
    ) public {
        require(_proposals.lenght > 2, "There need to be at least 2 proposals");
        //add new voting proposal
        votingProcesses[processCounter] = VotingProcess({
            id: processCounter,
            name: _name,
            description: _description,
            proposals: _proposals
        });
        processCounter += 1;
    }
}