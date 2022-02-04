import { useDispatch } from 'react-redux'
import { setHasRegistered } from '../store/home.slice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import {ethers} from 'ethers';
import { initLocalStorage, generateIdentityCommitment } from '../web3/semaphore';
import { getOneVoteContract } from '../web3/contracts';

import styles from './Register.module.css';

import votingImage from '../assets/voting.svg';

const Register = () => {
    const dispatch = useDispatch()
    const [identityCommitment, setIdentityCommitment] = useState(null);
    const [connectWallet, setConnectWallet] = useState('');
    const [pending, setPending] = useState(false);

    const handleRegisterClick = async () => {
        const {ethereum} = window;
        if(!ethereum){
            console.log("Install metamask");
            return;
        }
        const accounts = await ethereum.request({method: 'eth_accounts'});
        if (accounts.length == 0) {
            setConnectWallet('You need to connect wallet');
        }

        const oneVote = await getOneVoteContract();
        console.log("Commitment: ", identityCommitment);
        try{
            setPending(true);
            const tx = await oneVote.insertIdentityAsClient(ethers.BigNumber.from(identityCommitment))
            const receipt = await tx.wait();
            setPending(false);
            console.log(receipt);
    
            if (receipt.status === 1) {
                dispatch(setHasRegistered(true));
            }
        }catch(e){
            setPending(false);
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
                    <img width="500px;" src={votingImage} alt="wrong path"/>
                </div>
                <div style={{marginBottom: "4em", marginTop: "2em"}}>
                    <h3 style={{color: "#f1356d"}}>
                        <Link style={{color: "#f1356d", margin: "0"}} to="/howItWorks">
                            How it works?
                        </Link>
                    </h3>
                </div>
                <div style={{marginBottom: "3em"}}>
                    <h2 style={{fontStyle:"italic", color: "gray", marginBottom: "0.5em"}}>Start Voting</h2>
                    <button onClick={handleRegisterClick} className="baseButton">Register</button>
                    <h2 style={{color: "red", marginTop: "1em"}}>{connectWallet}</h2>
                </div>
                {pending && <div style={{marginTop: "2em"}}>
                    <Spinner animation="border" />
                </div>}
            </div>
        </div>
    );
}
 
export default Register