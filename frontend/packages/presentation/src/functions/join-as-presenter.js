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

export function joinAsPresenter(joinCode, client, addClientHandlers, updateSlide) {
    axios.get('sessions/join/', {params: {token: joinCode}})
        .then((r) => {
            let sessionId = r.data.id;

            // client = new W3CWebSocket("ws://api.auttend.com/ws/" + joinCode + "/?presenter");
            // addClientHandlers();
            axios.get(`sessions/${sessionId}/`)
                .then((r) => {
                    updateSlide(r.data);
                });
        });
}