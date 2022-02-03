import { useDispatch, useSelector } from 'react-redux'
import { selectHasRegistered, setHasRegistered } from '../store/home.slice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {ethers} from 'ethers';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore';
import { getOneVoteContract } from '../web3/contracts';

import styles from './Register.module.css';

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
        <div className={styles.Register}>
            <div style={{margin: "0 auto", justifyContent: "center", textAlign:"center"}}>
                <div className={styles.title}>
                    Welcome to OneVote
                </div>
                <div className={styles.subtitle}>
                    decentralized anonymous voting app
                </div>
                <div>
                    <img width="500px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPGYkF3Fs5DLJccJHwUYXlFs9HCpR1ZG25Hg&usqp=CAU" alt=""/>
                </div>
                <div style={{marginBottom: "3em", marginTop: "2em"}}>
                    <h3 style={{color: "#f1356d"}}>
                        <Link style={{color: "#f1356d", margin: "0"}} to="/howItWorks">
                            How it works?
                        </Link>
                    </h3>
                </div>
                <div style={{marginBottom: "3em"}}>
                    <h1>Start Voting</h1>
                    <button onClick={handleRegisterClick} className="baseButton">Register</button>
                </div>
            </div>
        </div>
    );
}
 
export default Register