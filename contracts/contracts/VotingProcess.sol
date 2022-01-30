//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { Semaphore } from './Semaphore.sol';

contract VotingProcess{
    uint256[] public identityCommitments;

    // A mapping of all signals broadcasted
    mapping (uint256 => bytes) public signalIndexToSignal;

    // A mapping between signal indices to external nullifiers
    mapping (uint256 => uint256) public signalIndexToExternalNullifier;

    // The next index of the `signalIndexToSignal` mapping
    uint256 public nextSignalIndex = 0;

    Semaphore public semaphore;

    event SignalBroadcastByClient(uint256 indexed signalIndex);

    uint public id;
    string public name;
    string public description;
    string[] public proposals;

    mapping (string => uint) votesPerProposal;
    string winningProposal;

    function getProposals() view public returns (string[] memory){
        return proposals;
    }

    constructor(
        uint _id,
        string memory _name,
        string memory _description,
        string[] memory _proposals,
        Semaphore _semaphore
    ){
        id = _id;
        name = _name;
        description = _description;
        proposals = _proposals;
        semaphore = _semaphore;
    }

    function getNextSignalIndex() public view returns (uint256) {
        return nextSignalIndex;
    }

    function getIdentityCommitments() public view returns (uint256 [] memory) {
        return identityCommitments;
    }

    function getIdentityCommitment(uint256 _index) public view returns (uint256) {
        return identityCommitments[_index];
    }

    function insertIdentityAsClient(uint256 _leaf) public {
        semaphore.insertIdentity(_leaf);
        identityCommitments.push(_leaf);
    }

    function addExternalNullifier(uint232 _externalNullifier) public {
        semaphore.addExternalNullifier(_externalNullifier);
    }

    function broadcastSignal(
        bytes memory _signal,
        uint256[8] memory _proof,
        uint256 _root,
        uint256 _nullifiersHash,
        uint232 _externalNullifier
    ) public {
        uint256 signalIndex = nextSignalIndex;

        // store the signal
        signalIndexToSignal[nextSignalIndex] = _signal;

        // map the the signal index to the given external nullifier
        signalIndexToExternalNullifier[nextSignalIndex] = _externalNullifier;

        // increment the signal index
        nextSignalIndex ++;

        // broadcast the signal
        semaphore.broadcastSignal(_signal, _proof, _root, _nullifiersHash, _externalNullifier);

        emit SignalBroadcastByClient(signalIndex);
    }

    /*
     * Returns the external nullifier which a signal at _index broadcasted to
     * @param _index The index to use to look up the signalIndexToExternalNullifier mapping
     */
    function getExternalNullifierBySignalIndex(uint256 _index) public view returns (uint256) {
        return signalIndexToExternalNullifier[_index];
    }

    function getSignalBySignalIndex(uint256 _index) public view returns (bytes memory) {
        return signalIndexToSignal[_index];
    }

    function vote(
        string memory signal,
        bytes memory _signal,
        uint256[8] memory _proof,
        uint256 _root,
        uint256 _nullifiersHash,
        uint232 _externalNullifier
    ) public {
        //check if signal matches one of proposals
        bool exist = false;
        for(uint i = 0; i < proposals.length; i ++){
            string memory proposal = proposals[i];
            if (keccak256(abi.encodePacked((signal))) == keccak256(abi.encodePacked((proposal)))){
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