import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {

  const newPasswordInputRef = useRef()

  const Navigate = useNavigate()

  const API_KEY = 'AIzaSyDJBfsvccXwiw7-B544jduXH5TRzRoEsHs'

  const authCtx = useContext(AuthContext)

  const submitHandler = (e) =>{
    e.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value
    alert(enteredNewPassword)

    // Add validation

    // This function changes password of the user from the profile
    
    if(enteredNewPassword.length === 0){
      return 
    }
    else{
      
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken : false
        }),
        headers: {
          'Content-Type' : 'application/json'
          
        }
      }).then(res => {
        //Assumes Always succeed;
  
        alert('success')
        Navigate('/')
      })
    }


  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength='7' ref = {newPasswordInputRef} id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
