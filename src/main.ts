import './style.css'

import {connectToServer} from "./socket-client.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h2><Webs>Websocket - Client</Webs></h2>
  
  <input type="text" id="jwt-token" placeholder="Json Web Token">
  <button id="btn-connect">Connect</button>
  <button  id="join">JOIN</button >
  
  <br/>
  <span id="server-status">Offline</span>
  
  <ul id="clients-ul"></ul>
  
  <form id="message-form">
  <input placeholder="message" type="text" id="message-input">
  <input placeholder="room" type="text" id="room-input">
  <input type="submit" value="Send">
  
</form>

<h3>Messages</h3>
<ul id="messages-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')

btnConnect.addEventListener('click', () => {
    if(jwtToken.value.trim().length <= 0) return
    connectToServer(jwtToken.value.trim())
})
