import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import Home from './components/Home';
import Register from './components/Register';
import VotingPage from './components/VotingPage';
import CreateProcess from './components/CreateProcessPage';

import { useSelector } from 'react-redux';
import { selectHasRegistered } from './store/home.slice';

function App() {
  const hasRegistered = useSelector(selectHasRegistered);

  const renderRoutes = () => {
    let ret;
    if (!hasRegistered){
      ret = 
      <Routes>
        <Route path="/" element={<Register/>} />
      </Routes>
    }else{
      ret = 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/voting/:id" element={<VotingPage/>} />
        <Route path="/createProcess" element={<CreateProcess/>} />
      </Routes>
    }
    return ret;
  }

  return (
    <Router>
      <div className="App">
		    <Navbar />
		    <div className="content">
          {renderRoutes()}
		    </div>
      </div>
    </Router>
  );
}

export default App;
