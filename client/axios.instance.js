import axios from 'react-native-axios';

export default instance = axios.create({
    baseURL: 'http://192.168.0.17:5000',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});