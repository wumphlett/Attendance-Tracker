import React, { Component } from "react";


import axios from "axios";


class Logout extends Component {
  constructor(props) {
    super(props);

    try {
      const data = axios.post('https://api.auttend.com/api/logout/', {refresh_token: localStorage.getItem('refresh_token')});
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      window.location.href = '/'
    } catch (e) {

    }
  }

  render() {
    return (
      <div></div>
    )
  }
}


export default Logout
