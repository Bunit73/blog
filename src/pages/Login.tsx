import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { BaseFunctionComponent } from '../common/BaseComponent';
import { AuthContext } from '../contexts/AuthContext';
import './Login.scss';
import { toast } from 'react-toastify';
import { Page } from '../common/Page';

const Login: BaseFunctionComponent = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Success', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Invalid Login', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <Page>
      <div className="text-center">
        <main className="form-signin">
          {!user ? (
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
              </button>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={signOut}>
              Logout
            </button>
          )}
        </main>
      </div>
    </Page>
  );
};

export { Login };
