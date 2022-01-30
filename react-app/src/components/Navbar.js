import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ConnectWallet from './ConnectWallet';
import { getVotingProcessContract, getOneVoteContract } from '../web3/contracts';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore'

const Navbar = () => {

    const [hasRegistered, setHasRegistered] = useState(false);
    const [identityCommitment, setIdentityCommitment] = useState(null);

    const handleRegisterClick = async () => {
        const oneVote = await getOneVoteContract();
        console.log("Commitment: ", identityCommitment);
        const tx = await oneVote.insertIdentityAsClient(identityCommitment.toString())
        const receipt = await tx.wait()
        console.log(receipt)

        if (receipt.status === 1) {
            setHasRegistered(true);
        }else{
        }
    }

    useEffect(() => {
        initLocalStorage();
        setIdentityCommitment(generateIdentityCommitment());
        console.log("Identity commitment: ", identityCommitment);
    }, []);

    const renderRegisterButton = () => {
        let button;
        if (hasRegistered){
            button = <div>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/createProcess">Create voting process</Link>
            </div>
        }else {
            button = <button onClick={handleRegisterClick} className="baseButton">Register identity</button>
        }
        return button;
    }

    return (  
        <nav className="navbar">
            <Link className="link" to="/"><h1>OneVote</h1></Link>
            <div className="links">
                {renderRegisterButton()}
            </div>
            <div>
                <ConnectWallet />
            </div>
        </nav>
    );
}
 
export default Navbar;