import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVotingProcess } from '../web3/contracts';

import styles from './VotingPage.module.css';

import { getVotingProcessContract } from '../web3/contracts';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore'

const VotingPage = () => {
    const { id } = useParams()

    const [votingProcess, setVotingProcess] = useState(null);
    const [identityCommitment, setIdentityCommitment] = useState(null);
    const [hasRegistered, setHasRegistered] = useState(false);
    const [hasCheckedRegistration, setHasCheckedRegistration] = useState(false);

    useEffect(() => {
        getVotingProcess(id).then((result) => {
            console.log("Voting process result: ", result);
            setVotingProcess(result);
        })

        initLocalStorage(id);
        setIdentityCommitment(generateIdentityCommitment(id));
        console.log("Identity commitment: ", identityCommitment);
    }, []);

    const renderRegisterButton = () => {
        let button;
        if (hasRegistered){
            button = <button onClick={handleRegisterClick} className="greenButton">Registered</button>
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
            setHasRegistered(true)
            setHasCheckedRegistration(true)
            
        }else{

        }
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
            </div>}
        </div>
    );
}
 
export default VotingPage;