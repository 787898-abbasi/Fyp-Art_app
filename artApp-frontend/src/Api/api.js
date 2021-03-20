import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://6d3d53e00389.ngrok.io',
});

export default instance;
