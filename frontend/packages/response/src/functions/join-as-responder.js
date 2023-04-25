/**
 * join-as-presenter.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Join a quiz session as a presenter
 */
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export function joinAsResponder(joinCode, client, setClient, addClientHandlers, setActiveQuestion) {
    axios.get('sessions/join/', {params: {token: joinCode}})
        .then((r) => {
            let sessionId = r.data.id;
            setClient(new W3CWebSocket("wss://api.auttend.com/ws/" + joinCode + "/"), () => {
                console.log(client)
            });
            // addClientHandlers(client, setActiveQuestion);
            // axios.get(`https://api.auttend.com/api/sessions/${sessionId}/respond/`)
            //     .then((r) => {
            //         setActiveQuestion(r.data);
            //     });

        })
}