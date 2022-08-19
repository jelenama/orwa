import React, { useState, useContext } from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const SignIn = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {

        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        console.log("uspjeh")
        navigate('/');
      }
      else
        setMessage(message);
    });
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={onSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="username"
              placeholder="username"
              name="username"
              onChange={onChange}
              value={user.username}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={user.password}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.green_btn}>
              LOG IN
            </button>
          </form>
        </div>
        
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/sign-up">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          {message ? <Message message={message}/> : null}

        </div>
      </div>
    </div>
  );
};

export default SignIn;