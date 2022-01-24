import Button from 'react-bootstrap/Button'
import { useEffect } from 'react';
import { useState } from 'react';

const ConnectWallet = () => {
    const [currentAccount, setCurrentAccount] = useState(null);

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

    useEffect(() => {
        checkWalletIsConnected();
    })

    const connectWalletButton = () => {
        return (
            <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        )
    }

    return (  
        <div className="connectWallet">
            {currentAccount ? currentAccount : connectWalletButton()}
        </div>
    );
}
 
export default ConnectWallet;