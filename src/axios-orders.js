import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-bbf10-default-rtdb.firebaseio.com/'
});

export default instance;