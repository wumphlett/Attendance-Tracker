import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json'

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 403 && !refresh) {
      refresh = true;

    const response = await axios.post('http://localhost:8000/token/refresh/', {
      refresh:localStorage.getItem('refresh_token')
    });

    if (response.status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      return axios(error.config);
    }
  }
  refresh = false;
  return error;
});
