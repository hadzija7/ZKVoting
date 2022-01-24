import styles from './VotingProcess.module.css'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const VotingProcess = (props) => {
    const process = props.process;

    console.log(props, process);

    return (  
        <Container>
            <Row>
                <Col>
                    <Row >
                        <h2 className={styles.title}>{process.name}</h2>
                        <p>{process.description}</p>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Button  
                        variant="primary"
                        >Vote</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
 
export default VotingProcess
;