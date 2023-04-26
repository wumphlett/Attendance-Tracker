import axios from "axios"

export function handleTextBlur(event, activeAnswer) {
    event.preventDefault();
    axios.patch(`answers/${activeAnswer.id}/`, {
        text: activeAnswer.text,
    }).then((r) => {

    });
}
