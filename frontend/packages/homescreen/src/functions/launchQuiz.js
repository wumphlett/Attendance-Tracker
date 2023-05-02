/**
 * launchQuiz.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 APR 23
 *
 * Launch a given quiz
 */
import axios from "axios";

export function launchQuiz(presentation) {
    // Create the session
    axios.post('sessions/', { presentation: presentation.id })
        .then((res) => {
            if (res.data.join_code) {
                window.location.href = `/presentation/${res.data.join_code}`
            } else {
                console.log ("[ERROR] Unable to create a new presentation session.")
            }
        })
}