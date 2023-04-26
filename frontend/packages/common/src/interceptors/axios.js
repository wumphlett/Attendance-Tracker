const register_interceptors = (axios) => {
  if (localStorage.getItem('access_token') === null) {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.get("access") === null) {
      window.location.href = `https://api.auttend.com/accounts/login?next=${window.location.href}`;
    } else {
      localStorage.setItem('access_token', queryParams.get("access"));
      localStorage.setItem('refresh_token', queryParams.get("refresh"));
      window.location.href = '/'
    }
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

  axios.defaults.baseURL = 'https://api.auttend.com/api/';
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  axios.interceptors.response.use(resp => resp, async error => {
    const config = error?.config;

    if (error.response.status === 403 && !config?.sent) {
      config.sent = true;

      const response = await axios.post('https://api.auttend.com/token/refresh/', {
        refresh: localStorage.getItem('refresh_token')
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        config.headers = {
          ...config.headers,
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        };
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

        return axios(config);
      }
    }

    localStorage.clear();
    window.location.href = `https://api.auttend.com/accounts/login?next=${window.location.href}`;
    return error;
  });
};

export default register_interceptors;
