import React from 'react';
import "../auth.form.scss";
import { useNavigate ,Link } from 'react-router';
import Login from './Login';

const Register = () => {

  const navigate = useNavigate();

    const handlesumbit =(e) =>{
    e.preventDefault();
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handlesumbit}>
          <div className="input-group">

            <label htmlFor='username'>Username</label>
            <input type='text' id='username'name='username'placeholder='Enter Username'/>

          </div>
          <div className="input-group">

            <label htmlFor='email'>Email</label>
            <input type='email' id='email'name='email'placeholder='Enter Email Address'/>

          </div>

          <div className="input-group">

            <label htmlFor='password'>Password</label>
            <input type='password' id='password'name='password'placeholder='Enter Password'/>

          </div>
          <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account? <Link to={"/login"} >Login</Link></p>
      </div>
    </main>
  )
}

export default Register;
