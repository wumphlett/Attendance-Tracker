/**
 * homescreen.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 12 APR 23
 *
 * AUttendance home screen for professors
 */
// Main
import React from "react";
// Components
import { Navbar } from "@frontend/common/build"
import Logo from "@frontend/common/build/images/logo.png"
import WelcomeCard from "../components/welcome-card";
import QuizList from "../components/quiz-list";
import SessionList from "../components/session-list";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

import axios from 'axios';

class Homescreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      presentations: [],
      activePresentation: null
    }
    this.setState = this.setState.bind(this)
    this.setActivePresentation = this.setActivePresentation.bind(this)
  }

  componentDidMount() {
    this.set_quiz_list();
  }

  set_quiz_list = () => {
    axios.get("presentations/").then((r) => {
      this.setState({
          user: r.data.user,
          presentations: r.data.presentations,
        }
      )
    })
  };

  setActivePresentation = (presentation) => {
    this.setState({ activePresentation: presentation })
  }

  render() {
    return (
      <div className={"primary-dark-theme"}>
        <Navbar logo={Logo}/>
        <div className={"content d-flex flex-row"}>
          <div className={"col-md-7 col-12 p-2 h-100 d-flex flex-column"}
               style={{flex: 1}}>                      {/* Available Quizzes */}
            <div>
              <WelcomeCard user={this.state.user}/>
            </div>
            <div className={"d-flex flex-column mt-2 overflow-auto"} style={{flex: 1}}>
              <QuizList
                presentations={this.state.presentations}
                setUserState={this.setState}
                setActivePresentation={this.setActivePresentation}
              />
            </div>
          </div>

          <div className={"col-md-5 h-100 d-none d-md-block"}>           {/* Quiz Analytics */}
            <SessionList
                activePresentation={this.state.activePresentation}
                setActivePresentation={this.setActivePresentation}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Homescreen