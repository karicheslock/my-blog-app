import './index.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <div className='bg-light-olive'>
      <Router>
        <div className='flex flex-col bg-subdued-scarlet h-20 text-light-teal items-center justify-center'>
          <nav>
            <Link to="/" className='font-bold text-3xl px-5'>Home</Link>

            {!isAuth ? (
            <Link to="/login" className='font-bold text-3xl px-5'>Login</Link>
            ) : (
              <>
                <Link to="/createpost" className='font-bold text-3xl px-5'>Create Post</Link>
                <button onClick={ signUserOut } className='font-bold text-3xl px-5'>Log Out</button>
              </>
            )}
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={ setIsAuth } />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
