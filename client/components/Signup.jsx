import React from 'react';
import { useState } from 'react';
import styles from '../Styles/LoginStyles.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Type Username here', username);
    console.log('Type Password here', password);
    console.log('Button has been clicked to login');
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.logTitle}>Log In</h1>
      <div>
        <input
          className={styles.username}
          type='username'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          className={styles.password}
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div>
          <button onClick={handleSignUp}>Login</button>
        </div>
      </div>
    </div>
  );
}
