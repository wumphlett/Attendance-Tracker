/**
 * homescreen.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Verison - 22 MAR 23
 *
 * AUttendance home screen for professors
 */
// Main
import React from "react";
// Components
import { Navbar } from "@frontend/common/build"
import WelcomeCard from "../components/welcome-card";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class Homescreen extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           user: {
               email: "ewl0140@auburn.edu",
               firstname: "Edward",
               lastname: "Lewis",
               prefix: "Dr.",
               token: "",
               quizzes: [""]
           }
       }
   }

   render() {
       return (
           <div className={"primary-dark-theme vh-100"}>
               <Navbar />

               <div className={"content"}>
                   <div className={"col-md-7 col-12 p-2"}>                      {/* Available Quizzes */}
                       <WelcomeCard prefix={this.state.user.prefix} lastname={this.state.user.lastname}/>
                   </div>

                   <div className={"col-md-5 d-none d-md-block"}>           {/* Quiz Analytics */}

                   </div>
               </div>
           </div>
       )
   }
}

export default Homescreen