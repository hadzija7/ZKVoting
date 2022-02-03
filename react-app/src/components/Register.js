import { useDispatch, useSelector } from 'react-redux'
import { selectHasRegistered, setHasRegistered } from '../store/home.slice';
import { useState, useEffect } from 'react';

import {ethers} from 'ethers';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore';
import { getOneVoteContract } from '../web3/contracts';

const Register = () => {
    const dispatch = useDispatch()
    const [identityCommitment, setIdentityCommitment] = useState(null);

    const handleRegisterClick = async () => {
        const oneVote = await getOneVoteContract();
        console.log("Commitment: ", identityCommitment);
        const tx = await oneVote.insertIdentityAsClient(ethers.BigNumber.from(identityCommitment))
        const receipt = await tx.wait()
        console.log(receipt)

        if (receipt.status === 1) {
            dispatch(setHasRegistered(true));
        }
    }


    useEffect(() => {
        initLocalStorage();
        setIdentityCommitment(generateIdentityCommitment());
        console.log("Identity commitment: ", identityCommitment);
    }, []);
    
    return ( 
        <div>
            <div style={{margin: "0 auto", justifyContent: "center", textAlign:"center"}}>
                <h1>please register</h1>
                <button onClick={handleRegisterClick} className="baseButton">Register</button>
            </div>
        </div>
    );
}
 
export default Register