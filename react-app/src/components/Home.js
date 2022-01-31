import { useState } from 'react';
import { useEffect } from 'react';
import VotingProcess from './VotingProcess';

import { getVotingProcesses } from '../web3/contracts';

const Home = (props) => {
    const [votingProcesses, setVotingProcesses] = useState([]);
    const hasRegistered = props.hasRegistered;

    useEffect(() => {
        getVotingProcesses().then(
            res => {
                setVotingProcesses(res);
            }
        );
    }, [])

    const renderProcesses = () => {
        let retVal;
        if(true){
            retVal = <div>

                    {votingProcesses.map( (votingProcess) => (
                        <VotingProcess className="VotingProcess" key={votingProcess.id} votingProcess = {votingProcess}/>
                    ))}
                </div>
        }else{
            retVal = <div>
                please register
            </div>
        }
        return retVal
    } 

    return (  
        <div className="home">
            {renderProcesses()}
        </div>
    );

}
 
export default Home;