//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { VotingProcess } from './VotingProcess.sol';
import { Semaphore } from './Semaphore.sol';

contract OneVote {
    mapping(uint => VotingProcess) public votingProcesses;
    uint processCounter;

    struct ProcessDTO {
        uint id;
        string name;
        string description;
        string[] proposals;
    }

    function createVotingProcess(
        string memory _name,
        string memory _description,
        string[] memory _proposals,
        Semaphore _semaphore
    ) public {
        require(_proposals.length > 1, "There need to be at least 2 proposals");
        //add new voting proposal
        VotingProcess vp = new VotingProcess(processCounter, _name, _description, _proposals, _semaphore);

        votingProcesses[processCounter] = vp;
        processCounter += 1;
    }

    function getProcesses() public view returns(ProcessDTO[] memory){
        uint256 i = 0;
        ProcessDTO[] memory returnProcesses = new ProcessDTO[](processCounter);

        for(i; i < processCounter; i++){
            returnProcesses[i] = ProcessDTO({
                id: votingProcesses[i].id(),
                name: votingProcesses[i].name(),
                description: votingProcesses[i].description(),
                proposals: votingProcesses[i].getProposals()
            });
        }

        return returnProcesses;
    }

    function getProcess(uint id) public view returns (ProcessDTO memory){
        VotingProcess votingProcess = votingProcesses[id];
        return ProcessDTO({
            id: votingProcess.id(),
            name: votingProcess.name(),
            description: votingProcess.description(),
            proposals: votingProcess.getProposals()
        });
    }

}