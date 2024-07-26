import axios from 'axios';

// Set base URL to Laravel backend
axios.defaults.baseURL = 'http://localhost:8000';

// Allow cookies to be sent with requests
axios.defaults.withCredentials = true;

// Fetch CSRF token and set it in Axios
async function fetchCsrfToken() {
    try {
        const response = await axios.get('/api/csrf-token');
        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token;
    } catch (error) {
        console.error('Could not fetch CSRF token:', error);
    }
}

fetchCsrfToken();

export default axios;
