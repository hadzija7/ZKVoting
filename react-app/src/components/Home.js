import { useState } from 'react';
import { useEffect } from 'react';
import VotingProcess from './VotingProcess';

import { getVotingProcesses } from '../web3/contracts';

const Home = () => {
    const [votingProcesses, setVotingProcesses] = useState([]);

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