import './App.css';
import React from "react"
import Presentation from "./presentation";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./common/components/login";
import Logout from "./common/components/logout";

class App extends React.Component {
        state = {
            sessionConnected: false,
            joinCode: "",
        };

        render() {
            return (
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Presentation />} />
                            <Route path="/presentation/login" element={<Login />}/>
                            <Route path="/presentation/logout" element={<Logout />}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            );
        }

}

export default App;
