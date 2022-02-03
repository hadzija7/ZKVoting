import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';

import { useDispatch, useSelector } from 'react-redux'
import { selectNetwork, selectCorrectNetwork, setNetwork, setCorrectNetwork } from '../store/home.slice';

import Modal from 'react-bootstrap/Modal';


const ConnectWallet = () => {
    const dispatch = useDispatch();
    const correctNetwork = useSelector(selectCorrectNetwork);
    const networkId = useSelector(selectNetwork);

    const HARMONY_TESTNET_ID = "1666700000";
    const [currentAccount, setCurrentAccount] = useState(null);

    const [networkChangeStatus, setNetworkChangeStatus] = useState('');

    // const [correctNetwork2, setCorrectNetwork2] = useState(true);

    const checkWalletIsConnected = async () => {
        const {ethereum} = window;

        if (!ethereum) {
            console.log("Install metamask");
            return;
        } else {
            console.log("All good to go!");
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});
        if (accounts.length !== 0) {
            setCurrentAccount(accounts[0]);
        } else {
            console.log("No account connected!");
        }
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Install metamask!");
        }

        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            console.log("account[0]: ", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err);
        }
    }

    const checkNetwork = async () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const { chainId } = await provider.getNetwork();
        dispatch(setNetwork(chainId));
        console.log("Connected to chain with id: ", chainId);
        if(chainId != HARMONY_TESTNET_ID){
            dispatch(setCorrectNetwork(false));
            console.log("Network is bad");
            // setCorrectNetwork2(false);
        }
    }

    const handleNetworkChange = async () => {
        if(window.ethereum){
            window.ethereum.on('chainChanged', () => {
                checkNetwork();
            })
            console.log("Handler on change set");
        }
    }

    useEffect(() => {
        checkWalletIsConnected();
        checkNetwork();
        handleNetworkChange();
        console.log("Correct network: ", correctNetwork.toString());
    },[])

    const connectWalletButton = () => {
        return (
            <button className="baseButton" onClick={connectWalletHandler}>Connect Wallet</button>
        )
    }

    const showAccount = () => {
        const firstPart = currentAccount.substring(0,4);
        const lastPart = currentAccount.substring(currentAccount.length - 4);
        const string = firstPart + "..." + lastPart;
        return (
            <label onClick={() => navigator.clipboard.writeText(currentAccount)} style={{userSelect:"none", cursor:"pointer"}}>{string}</label>
        )
    }

    const switchNetwork = async () => {
        try {
            const provider = window.ethereum;
            const res = await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethers.utils.hexlify(Number(HARMONY_TESTNET_ID))}],
            });
            dispatch(setNetwork(HARMONY_TESTNET_ID));
            dispatch(setCorrectNetwork(true));
            console.log("You have succefully switched to Harmony Test network: ");
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                setNetworkChangeStatus("This network is not available in your metamask, please add it");
                console.log("This network is not available in your metamask, please add it")
            }
            console.log("Failed to switch to the network: ", switchError)
        }
    }

    const addHarmonyToMetamask = async () => {
        try {
            const provider = window.ethereum;
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [

                    { 
                        chainId: '0x6357D2E0', 
                        chainName:'Harmony Testnet',
                        rpcUrls:['https://api.s0.b.hmny.io'],
                        blockExplorerUrls:['https://explorer.pops.one/'],  
                        nativeCurrency: { 
                            symbol:'ONE',   
                            decimals: 18
                        }
                    }        
                ]
            });
          } catch (addError) {
             console.log(addError);
        }
    }

    // onHide={handleClose}

    return (  
        <div className="connectWallet" style={{color: "grey"}}>
            {currentAccount ? showAccount() : connectWalletButton()}
            <div>
                <Modal show={!correctNetwork}>
                    <Modal.Header closeButton>
                        <Modal.Title>Wrong network</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Network id: {networkId}
                        </p>
                        <p>
                            We support Harmony testnet
                        </p>
                        <button onClick={switchNetwork} className="baseButton">Switch network</button>
                        <button onClick={addHarmonyToMetamask} className="inverseButton">Add harmony to metamask</button>
                        <p>{networkChangeStatus}</p>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
 
export default ConnectWallet;