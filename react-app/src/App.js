import Navbar from './components/Navbar';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
		<Navbar />
		<div className="content">
			<Home />
		</div>
    </div>
  );
}

export default App;
