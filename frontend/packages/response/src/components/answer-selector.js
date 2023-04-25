/**
 * answer-selector.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Select an answer in response
 */
// Main
import React from "react";
// Components
import AnswerCard from "./answer-card";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class AnswerSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizState: props.quizState,
            activeQuestion: props.activeQuestion
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        return (
            <div className={"h-100 w-100"}>
                {this.state.quizState === "response" || this.state.quizState === "post-response" ? (
                    <div className={"flex-wrap-container h-100 w-100"}>
                        {this.state.activeQuestion.answerChoices.map((answerChoice, index) => (
                            <div key={index} className={"flex-wrap-item"}>
                                <AnswerCard
                                    answer={answerChoice}
                                />
                            </div>
                        ))}
                    </div>
                ) : (<div></div>) }
            </div>
        )
    }
}

export default AnswerSelector