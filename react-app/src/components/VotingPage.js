import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

import { getVotingProcess } from '../web3/contracts';

const VotingPage = () => {
    const { id } = useParams()

    const [votingProcess, setVotingProcess] = useState(null);

    useEffect(() => {
        getVotingProcess(id).then((result) => {
            console.log("Voting process result: ", result);
            setVotingProcess(result);
        })
    }, []);

    return (  
        <div className="voting-page">
            {votingProcess && <Container>
                <Row>
                    <h1>{votingProcess.name}</h1>
                    <p>{votingProcess.description}</p> 
                </Row>
                <Row>
                    
                </Row>
            </Container>}
        </div>
    );
}
 
export default VotingPage;