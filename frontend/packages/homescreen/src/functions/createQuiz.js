/**
 * createQuiz.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 22 MAR 23
 *
 * Create a new quiz
 */
import axios from 'axios';

export function createQuiz(presentations, setState) {
    axios.post("presentations/", {name: "A Blank Presentation", description: "A blank description"}).then((r) => {
        let modifiedPresentations = presentations
        modifiedPresentations.push(r.data);
        setState({ presentations: modifiedPresentations})
    })
}