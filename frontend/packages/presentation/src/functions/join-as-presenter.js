/**
 * join-as-presenter.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Join a quiz session as a presenter
 */
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export function joinAsPresenter(joinCode, client, setClient, addClientHandlers, setSessionId) {
    axios.get('sessions/join/', {params: {token: joinCode}})
        .then((r) => {
            let sessionId = r.data.id;

            setClient(new W3CWebSocket("wss://api.auttend.com/ws/" + joinCode + "/?presenter"))
            // addClientHandlers();
            axios.get(`sessions/${sessionId}/`)
                .then((r) => {
                    setSessionId(r.data.id);
                });
        });
}