import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Quiz from './components/Quiz';
import './Styles/App.css';




const App = (props) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //check for JWT on page load, if user has JWT, send them to start page
  useEffect(() => {
    const jwtToken = localStorage.getItem('triviaJwtToken');
    jwtToken ? fetchUserData(jwtToken) : setLoading(false);
    setLoggedIn(false);
  }, [loggedIn]);

  const fetchUserData = async (jwt) => {
    const user = await fetch('/verifyJwt', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
    if (user.ok) {
      const userData = await user.json();
      setUser(userData)
    } else {
      localStorage.removeItem('triviaJwtToken');
    }
    setLoading(false);
  }

  if (loading) return null;

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/*" element={<Quiz />}/> */}

          <Route path="/*" element={user.username ? <Quiz user={user} setUser={setUser} /> : <SignUp setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
