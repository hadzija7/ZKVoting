import { useState } from 'react';
import { useEffect } from 'react';
import VotingProcess from './VotingProcess';

import { getVotingProcess } from '../web3/contracts';

const Home = () => {
    const [votingProcesses, setVotingProcesses] = useState(
        [
            {"name": "Process1", "description": "Speech right", "id": 1},
            {"name": "Process2", "description": "Human right", "id": 2},
            {"name": "Process3", "description": "President election", "id": 3}
        ]
    );

    const [processes, setProcesses] = useState([
        {"name": "Process1", "description": "Speech right", "id": 1},
        {"name": "Process2", "description": "Human right", "id": 2},
        {"name": "Process3", "description": "President election", "id": 3}
    ])

    useEffect(() => {
        const processes = getVotingProcess();
        setVotingProcesses(processes);
    })

    return (  
        <div className="home">
            {votingProcesses.map((process) => (
                <VotingProcess className="VotingProcess" process = {process}/>
            ))}
        </div>
    );

}
 
export default Home;