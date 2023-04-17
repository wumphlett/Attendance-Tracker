/**
 * deleteQuiz.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 23 MAR 23
 *
 * Delete a quiz
 */
import axios from "axios";

export function deleteQuiz(presentationToDelete, presentations, setState) {
    axios.delete(`presentations/${presentationToDelete.id}/`).then((r) => {
        let modifiedPresentations = presentations.filter((presentation) => presentation.id !== presentationToDelete.id)
        setState({ presentations: modifiedPresentations})
    })
}