import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import ConnectWallet from './ConnectWallet';

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>OneVote</h1>
            <div className="links">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/createProcess">Create voting process</Link>
            </div>
            <div>
                <ConnectWallet />
            </div>
        </nav>
    );
}
 
export default Navbar;