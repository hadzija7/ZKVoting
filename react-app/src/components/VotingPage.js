import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVotingProcess } from '../web3/contracts';
import Collapse from 'react-bootstrap/Collapse';

import styles from './VotingPage.module.css';

import { getVotingProcessContract } from '../web3/contracts';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore'

const VotingPage = () => {

    const circuitUrl = "https://semaphoreui.blob.core.windows.net/snarks/circuit.json"
    const provingKeyUrl = "https://semaphoreui.blob.core.windows.net/snarks/proving_key.bin"

    const { id } = useParams()

    const [votingProcess, setVotingProcess] = useState(null);
    const [identityCommitment, setIdentityCommitment] = useState(null);
    const [hasRegistered, setHasRegistered] = useState(false);
    const [hasCheckedRegistration, setHasCheckedRegistration] = useState(false);
    const [open, setOpen] = useState(true);
    const [vote, setVote] = useState('');

    useEffect(() => {
        getVotingProcess(id).then((result) => {
            console.log("Voting process result: ", result);
            setVotingProcess(result);
        })

        initLocalStorage(id);
        setIdentityCommitment(generateIdentityCommitment(id));
        console.log("Identity commitment: ", identityCommitment);
    }, []);

    const fetchWithoutCache = (
        url,
    ) => {
        return fetch(url, { cache: 'no-store' })
    }

    const renderRegisterButton = () => {
        let button;
        if (hasRegistered){
            button = <button disabled={true} className="greenButton">Registered</button>
        }else {
            button = <button onClick={handleRegisterClick} className="baseButton">Register identity</button>
        }
        return button;
    }

    const handleRegisterClick = async () => {
        const votingProcessesContract = await getVotingProcessContract(id);
        console.log("Commitment: ", identityCommitment);
        const tx = await votingProcessesContract.insertIdentityAsClient(identityCommitment.toString())
        const receipt = await tx.wait()
        console.log(receipt)

        if (receipt.status === 1) {
            setHasRegistered(true);
            setHasCheckedRegistration(true);
            setOpen(true);
        }else{

        }
    }

    const handleVoteClick = async () => {
        console.log('Downloading circuit from', circuitUrl)

        const cirDef = await (await fetchWithoutCache(circuitUrl)).json() 
        console.log("Downloaded circuit: ", cirDef);
        // const circuit = genCircuit(cirDef)
        

        console.log('Downloading proving key from', provingKeyUrl)
        // const provingKey = new Uint8Array(
        //     await (await fetch(provingKeyUrl)).arrayBuffer()
        // )
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
    }

    return (  
        <div className={styles.container}>
            {votingProcess && <div>
                <div>
                    <h1>{votingProcess.name}</h1>
                    <p>{votingProcess.description}</p> 
                </div>
                <div>
                    {renderRegisterButton()}
                </div>
                { true && <Collapse in={open}>
                    <div id="example-collapse-text" className={styles.collapse}>
                        <div>
                            Successfuly registered, let's vote now.
                        </div>
                        <div className={styles.proposalsContainer}>
                            {console.log(votingProcess.proposals)}
                        {votingProcess.proposals.map( (proposal) => (
                            <div key={proposal}>
                                <input value={proposal} type="radio" name="vote"/>
                                {proposal}
                            </div>
                        ))}
                            
                        </div>
                        <div style={{marginTop: "2em"}}>
                            <button onClick={handleVoteClick} className="baseButton">Vote</button>
                        </div>
                    </div>
                    
                </Collapse>}
            </div>}
        </div>
    );
}
 
export default VotingPage;