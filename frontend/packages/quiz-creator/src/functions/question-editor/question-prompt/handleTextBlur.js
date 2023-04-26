import axios from "axios"

function handleTextBlur(event, activeQuestion) {
    event.preventDefault();
    axios.patch(`questions/${activeQuestion.id}/`, {
        text: activeQuestion.text,
        is_partial_allowed: activeQuestion.is_partial_allowed,
    }).then((r) => {

    });
}

export default handleTextBlur;
