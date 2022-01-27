import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import Home from './components/Home';
import VotingPage from './components/VotingPage';
import CreateProcess from './components/CreateProcessPage';

function App() {
  return (
    <Router>
      <div className="App">
		    <Navbar />
		    <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/voting/:id" element={<VotingPage/>} />
            <Route path="/createProcess" element={<CreateProcess/>} />
          </Routes>
		    </div>
      </div>
    </Router>
  );
}

export default App;
