import { Link } from 'react-router-dom';

import ConnectWallet from './ConnectWallet';

import { useSelector } from 'react-redux'
import { selectHasRegistered, selectNetwork } from '../store/home.slice';

import logo from '../assets/OneVoteLogo.png';

const Navbar = () => {
    const HARMONY_TESTNET_ID = "1666700000";

    const hasRegistered = useSelector(selectHasRegistered);
    const networkId = useSelector(selectNetwork);

    const renderRegisterButton = () => {
        let button;
        if (hasRegistered){
            button = <div>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/createProcess">Create voting process</Link>
            </div>
        }
        return button;
    }

    const renderNetwork = () => {
        let ret;
        if (networkId == HARMONY_TESTNET_ID){
            ret = <div className="networkLabel">Harmony Testnet</div>
        }else{
            ret = <div className="networkLabel">Wrong network</div>
        }
        return ret;
    }

    return (  
        <nav className="navbar">
            <Link className="link" to="/"><img width="200px;" src={logo} alt="loading..."/></Link>
            <div className="links">
                {renderRegisterButton()}
            </div>
            <div>
                {renderNetwork()}
            </div>
            <div>
                <ConnectWallet />
            </div>
        </nav>
    );
}
 
export default Navbar;