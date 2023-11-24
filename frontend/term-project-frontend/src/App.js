
import NavBar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'
import TransactionPage from './pages/TransactionPage'
// App.js

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  

  return (
    <div className="App">

      <Router>
      <NavBar />
      
      <header className="App-header">
      <Routes>
      <Route exact path='/' element={<><Home /></>} />
      <Route exact path='/TransactionPage' element={<TransactionPage />}/>
      </Routes>
      </header>
      </Router>
    </div>
  );
}

export default App;
