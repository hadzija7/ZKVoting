import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';

const VotingPage = () => {
    const { id } = useParams()

    return (  
        <div className="voting-page">
            <Container>
                <Row>
                    <h1>Voting process {id}</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control type="text" placeholder="Owner address" />
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}
 
export default VotingPage;