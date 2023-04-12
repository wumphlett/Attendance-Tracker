import React, { Component } from "react";
import styled from 'styled-components';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Card, Divider} from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

import GlobalStyle from "./common/style/GlobalStyle";

import Logout from "./common/components/logout";
import Navigation from "./common/components/nav";

import Home from "./components/Home";


const StyledContent = styled.div`
  margin: 25px 25px 25px 25px;
  display: flex;
  flex-flow: column;
  height: 100%;
  
  .main-card {
    flex: 1 1 auto;
  }
`;


class App extends Component {
  state = {
    sessionConnected: false,
    joinCode: "",
  };

  render() {
    return (
    <div id="main">
      <GlobalStyle/>
      <StyledContent>
        <Card className="main-card">
            <Navigation></Navigation>
            <Divider dense className='mt-1 mb-3' />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/logout" element={<Logout/>}/>
              </Routes>
            </BrowserRouter>
        </Card>
      </StyledContent>
    </div>
  );
  }
}

export default App;
