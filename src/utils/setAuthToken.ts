import axios from 'axios';

//* Checking if there's a token
const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
}

export default setAuthToken;