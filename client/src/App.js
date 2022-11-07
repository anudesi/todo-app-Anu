import './App.css';
import React, { useState } from 'react';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Dashboard from "./components/Dashboard/Dashboard"
import Home from './components/Home/Home';
import {BrowserRouter as Router,
Route,
Routes} from "react-router-dom"
import NavBar from './components/NavBar/NavBar';

function App() {

  const [authorized, setAuthorized] = useState(false)

  const authHandler = () => setAuthorized(oldState=>!oldState)

  /* const logoutHandler = () => setAuthorized(false) */

  // never change the state value like setAuthorized(!authorized)
  // when you want to update the state value depending on its old state value then please always use call back

  return (
    <div className="App">
      <header className="App-header">

      <Router>
        <NavBar authorized={authorized} authHandler={authHandler}/>
        TO-DO App
          <Routes>
            <Route path='/dashboard' element={<Dashboard authorized={authorized}/>} />
            <Route path='/signin' element={<Signin itCouldBeAnyName={authHandler} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
