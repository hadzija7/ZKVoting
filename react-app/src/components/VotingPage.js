import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

const VotingPage = () => {
    const { id } = useParams()

    return (  
        <div className="voting-page">
            <Container>
                <Row>
                    <h1>Voting process {id}</h1>
                    <p>Description</p> 
                </Row>
                <Row>
                    fjsdlk
                </Row>
            </Container>
        </div>
    );
}
 
export default VotingPage;