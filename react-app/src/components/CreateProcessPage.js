import Form from 'react-bootstrap/Form'
import styles from './CreateProcessPage.module.css';

//web3 imports
import { deployVotingProcess, deployTestContract, getTestContract } from '../web3/contracts'
import { useState } from 'react';



const CreateProcess = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [proposals, setProposals] = useState('');

    const createProcess = (e) => {
        e.preventDefault();
        //format proposals
        let proposalArray = formatProposals(proposals);
        //check form inputs
        if(!isFormValid()){
            window.alert("Form is not valid");
            return;
        }
        //deploy new process contract
        deployVotingProcess(name, description, proposalArray).then(res => {
            console.log(res);
        });
    }

    const isFormValid = () => {
        if(proposals < 2)
            return false;
        return true;
    }

    const formatProposals = (input) => {
        let proposals = input.split(',');
        let array = []
        for(let i=0; i < proposals.length; i ++){
            array.push(proposals[i].trim());
        }

        console.log("Proposals: ", array);
        return array;
    }


    return (  
        <div >
            <div className={styles.createProcess}>
                <h1>Create new voting process</h1>
            </div>
            <form onSubmit={createProcess} className={styles.create}>
                <div>
                    <label>Process name:</label>
                    <input 
                        type="text"
                        required
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Process description:</label>
                    <input 
                        type="text"
                        required
                        value = {description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Proposals:</label>
                    <input 
                        type="text"
                        required
                        value = {proposals}
                        onChange={(e) => setProposals(e.target.value)}
                    />
                </div>
                <div>
                    <button className="baseButton">Create new process</button>
                </div>
            </form>

            {/* <Form>
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
                    <div onClick={deployVotingProcess} className="baseButton">Create new process</div>
                </div>
            </Form> */}
        </div>
    );
}
 
export default CreateProcess;