import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVotingProcess } from '../web3/contracts';

import styles from './VotingPage.module.css';

import {ethers} from 'ethers';

const VotingPage = () => {

    const circuitUrl = "https://semaphoreui.blob.core.windows.net/snarks/circuit.json"
    const provingKeyUrl = "https://semaphoreui.blob.core.windows.net/snarks/proving_key.bin"

    const { id } = useParams()

    const [votingProcess, setVotingProcess] = useState(null);
    const [vote, setVote] = useState('');

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
                    <div id="example-collapse-text" className={styles.collapse}>
                        <div>
                            Successfuly registered, let's vote now.
                        </div>
                        <div className={styles.proposalsContainer}>
                            {console.log(votingProcess.proposals)}
                        {votingProcess.proposals.map( (proposal) => (
                            <div key={proposal}>
                                <input value={proposal} type="radio" name="vote"/>
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