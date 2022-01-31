import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVotingProcess, getOneVoteContract } from '../web3/contracts';

import styles from './VotingPage.module.css';

import {ethers} from 'ethers';


import {
    Identity,
    genIdentity,
    genIdentityCommitment,
    genCircuit,
    serialiseIdentity,
	genWitness,
    genExternalNullifier,
    genProof,
    genPublicSignals,
    genBroadcastSignalParams,
} from 'libsemaphore-no-test';

import {
    initStorage,
    storeId,
    retrieveId,
    hasId,
} from '../web3/semaphoreStorage';

// const fs = require('fs');


const VotingPage = () => {

    const circuitUrl = "https://semaphoreui.blob.core.windows.net/snarks/circuit.json"
    const PATH_TO_CIRCUIT = '@/../../circuit/circuit.json';
    const provingKeyUrl = "https://semaphoreui.blob.core.windows.net/snarks/proving_key.bin"


    const { id } = useParams()

    const [votingProcess, setVotingProcess] = useState(null);
    const [vote, setVote] = useState('');
    const [proofStatus, setProofStatus] = useState('');

    useEffect(() => {
        getVotingProcess(id).then((result) => {
            console.log("Voting process result: ", result);
            setVotingProcess(result);
        })
    }, []);

    const fetchWithoutCache = (
        url,
    ) => {
        return fetch(url, { cache: 'no-store' })
    }

    const handleVoteClick = async () => {
        //get checked radio button
        var radios = document.getElementsByName('vote');
        let voteLocal;

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                console.log("Selected vote: ", radios[i].value);
                setVote(radios[i].value);
                voteLocal = radios[i].value;//setvote doesn't update imediately
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }

        console.log("Vote", voteLocal);
        
        // const signalAsHex = ethers.utils.hexlify(
        //     ethers.utils.toUtf8Bytes(vote),
        // )

        const oneVoteContract = await getOneVoteContract();

        setProofStatus('Downloading leaves')
        const leaves = await oneVoteContract.getIdentityCommitments()
        console.log('Leaves:', leaves)

        setProofStatus('Downloading circuit')
        // const cirDef = JSON.parse(fs.readFileSync(PATH_TO_CIRCUIT, "utf8").toString())
        const cirDef = await (await fetch(circuitUrl)).json() 
        console.log("Downloaded circuit: ", cirDef);
        const circuit = genCircuit(cirDef)
        console.log("Generated circuit: ", circuit);

        setProofStatus('Downloading proving key')
        const toBuffer = function(ab) {
            const buf = Buffer.alloc(ab.byteLength);
            const view = new Uint8Array(ab);
            for (let i = 0; i < buf.length; ++i) {
                buf[i] = view[i];
            }
            return buf;
        }
        const provingKey = toBuffer((await (await fetch(provingKeyUrl)).arrayBuffer()))
        console.log("Proving key: ", provingKey);

        setProofStatus('Generating witness')
        const result = await genWitness(
			vote,
			circuit,
			retrieveId(),
			leaves,
			20,//config.chain.semaphoreTreeDepth,
			id,
        )
        
        const witness = result.witness
        console.log("Witness: ", witness);

        setProofStatus('Generating proof')
        const proof = await genProof(witness, provingKey)
        console.log('Generated proof: ', proof);

        setProofStatus('Voting');
        const publicSignals = genPublicSignals(witness, circuit);
        const params = genBroadcastSignalParams(result, proof, publicSignals);
        console.log("Params: ", params);
        const voteBytes = ethers.utils.toUtf8Bytes(voteLocal);
        console.log("Vote: ", voteLocal);

        const tx = await oneVoteContract.vote(
            voteBytes,
            params.proof,
            params.root,
            params.nullifiersHash,
			id.toString(),
        )

        console.log("tx: ", tx);
        const receipt = await tx.wait()
        console.log("Voting result: ", receipt);
    }

    return (  
        <div className={styles.container}>
            {votingProcess && <div>
                <div>
                    <h1>{votingProcess.name}</h1>
                    <p>{votingProcess.description}</p> 
                </div>
                    <div id="example-collapse-text" className={styles.collapse}>
                        <div>
                            Successfuly registered, let's vote now.
                        </div>
                        <div className={styles.proposalsContainer}>
                            {console.log(votingProcess.proposals)}
                        {votingProcess.proposals.map( (proposal) => (
                            <div key={proposal}>
                                <input value={proposal} type="radio" name="vote" />
                                {ethers.utils.toUtf8String(proposal)}
                            </div>
                        ))}
                            
                        </div>
                        <div style={{marginTop: "2em"}}>
                            <button onClick={handleVoteClick} className="baseButton">Vote</button>
                        </div>
                    </div>
            </div>}
        </div>
    );
}
 
export default VotingPage;