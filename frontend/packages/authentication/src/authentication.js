import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Card, Divider} from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

import GlobalStyle from "./style/GlobalStyle";
import styled from 'styled-components';

import Login from "./components/login";
import Logout from "./components/logout";
import Navigation from "./components/nav";

import Home from "./Home";

const StyledContent = styled.div`
  margin: 25px 25px 25px 25px;
  display: flex;
  flex-flow: column;
  height: 100%;
  
  .main-card {
    flex: 1 1 auto;
  }
`;

class Authentication extends React.Component {
    render() {
        return (
            <div id="main">
                <GlobalStyle />
                <StyledContent>
                    <Card className="main-card">
                        <Navigation></Navigation>
                        <Divider dense className='mt-1 mb-3' />
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/authentication/login" element={<Login/>}/>
                                <Route path="/authentication/logout" element={<Logout/>}/>
                            </Routes>
                        </BrowserRouter>
                    </Card>
                </StyledContent>
            </div>
        )
    }
}

export default Authentication
