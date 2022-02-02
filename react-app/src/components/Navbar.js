import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {ethers} from 'ethers';

import ConnectWallet from './ConnectWallet';
import { getOneVoteContract } from '../web3/contracts';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore';

import { useDispatch, useSelector } from 'react-redux'
import { selectHasRegistered, setHasRegistered } from '../store/home.slice';

const Navbar = () => {
    const dispatch = useDispatch()
    const hasRegistered = useSelector(selectHasRegistered);

    // const [hasRegistered, setHasRegistered] = useState(false);
    const [identityCommitment, setIdentityCommitment] = useState(null);

    const handleRegisterClick = async () => {
        const oneVote = await getOneVoteContract();
        console.log("Commitment: ", identityCommitment);
        const tx = await oneVote.insertIdentityAsClient(ethers.BigNumber.from(identityCommitment))
        const receipt = await tx.wait()
        console.log(receipt)

        if (receipt.status === 1) {
            dispatch(setHasRegistered(true));
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
            button = <button onClick={handleRegisterClick} className="baseButton" style={{marginRight:"1em"}}>Register identity</button>
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