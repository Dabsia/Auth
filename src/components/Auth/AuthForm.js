import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {

  const API_KEY = 'AIzaSyDJBfsvccXwiw7-B544jduXH5TRzRoEsHs'
  const Navigate = useNavigate()

  

  const authCtx = useContext(AuthContext)


  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Optional: Add Validation
    setIsLoading(true)
 
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }
    else{
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      setIsLoading(false) // changes the state while sending the request
      if (res.ok) {
        
        return res.json()
      }
      else{
        res.json().then(data => {
          let errorMessage = 'Authentication failed';
          if (data && data.error.message) {
            errorMessage = data.error.message;
          }
            alert(errorMessage)
            throw new Error(errorMessage)
        });
      }
    }).then(data => {
      authCtx.login(data.idToken)
      Navigate('/profile')
    }).catch(err => alert(err.message))

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref = {emailInputRef} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref = {passwordInputRef} id='password' required />
        </div>
        <div className={classes.actions}>
          {isLoading ? <p className='loading'>Loading...</p> :<button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
