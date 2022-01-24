import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import ConnectWallet from './ConnectWallet'

const Navbar = () => {
    return (  
        <nav className="navbar">
            <Container>
                <Col md="8"><h1>OneVote</h1></Col>
                <Col md="3"><a href="/">Home</a></Col>
                <Col md="1"><ConnectWallet /></Col>
            </Container>
        </nav>
    );
}
 
export default Navbar;