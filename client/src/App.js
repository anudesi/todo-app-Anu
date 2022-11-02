import './App.css';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Dashboard from "./components/Dashboard/Dashboard"
import Home from './components/Home/Home';
import {BrowserRouter as Router,
Route,
Routes} from "react-router-dom"
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Router>
        <NavBar/>
        TO-DO App
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
