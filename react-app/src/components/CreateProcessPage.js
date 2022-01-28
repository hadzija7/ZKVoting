import Form from 'react-bootstrap/Form'
import styles from './CreateProcessPage.module.css';

//web3 imports
import { deployVotingProcess, deployTestContract, getTestContract } from '../web3/contracts'


const CreateProcess = () => {

    const createProcess = () => {
        //check form inputs

        //deploy the new contract and save the address to OneVote contract
    }

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
                <div>
                    <div onClick={deployTestContract} className="baseButton">Create</div>
                    <div onClick={getTestContract} className="baseButton">GetTest</div>
                    <div onClick={deployVotingProcess} className="baseButton">Deploy voting process</div>
                </div>
            </Form>
        </div>
    );
}
 
export default CreateProcess;