import Form from 'react-bootstrap/Form'

import styles from './CreateProcessPage.module.css';

const CreateProcess = () => {
    return (  
        <div className={styles.createProcess}>
            <div>
                <h1>Create new voting process</h1>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Process name:</Form.Label>
                    <Form.Control type="text" placeholder="Name of the voting process" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Process description:</Form.Label>
                    <Form.Control type="text" placeholder="What is this process for?" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Proposals:</Form.Label>
                    <Form.Control type="text" placeholder="Name of the voting process" />
                </Form.Group>
            </Form>
        </div>
    );
}
 
export default CreateProcess;