/**
 * verify-professor.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 2 MAY 23
 *
 * Verify that a user has professor privileges
 */
const verifyProfessor = (axios) => {
    axios.get("presentations/").then((r) => {
        console.log(r.status)
        if (r.status === 403) {
            window.location.href = "https://auttend.com"
        }
    })
}

export default verifyProfessor;