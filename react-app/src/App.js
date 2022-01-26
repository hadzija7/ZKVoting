import Navbar from './components/Navbar';
import Home from './components/Home';
import VotingPage from './components/VotingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div className="App">
		    <Navbar />
		    <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/voting/:id" element={<VotingPage/>} />
          </Routes>
		    </div>
      </div>
    </Router>
  );
}

export default App;
