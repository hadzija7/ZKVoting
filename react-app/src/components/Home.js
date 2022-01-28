import { useState } from 'react';
import { useEffect } from 'react';
import VotingProcess from './VotingProcess';

import { getVotingProcesses } from '../web3/contracts';

const Home = () => {
    const [votingProcesses, setVotingProcesses] = useState(
        // Array.from(getVotingProcess())
    []);

    // const [processes, setProcesses] = useState([
    //     {"name": "Process1", "description": "Speech right", "id": 1},
    //     {"name": "Process2", "description": "Human right", "id": 2},
    //     {"name": "Process3", "description": "President election", "id": 3}
    // ])

    useEffect(() => {
        getVotingProcesses().then(
            res => {
                setVotingProcesses(res);
            }
        );
    }, [])

    return (  
        <div className="home">
            {votingProcesses.map( (votingProcess) => (
                <VotingProcess className="VotingProcess" key={votingProcess.id} votingProcess = {votingProcess}/>
            ))}
        </div>
    );

}
 
export default Home;