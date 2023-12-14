import {Manager, Socket} from "socket.io-client";

let socket: Socket
export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:8998', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });

    socket?.removeAllListeners()
    socket = manager.socket('/');

    // socket.on('connect', () => {
    //     console.log('Connected to server!');
    // });
    //
    // socket.on('disconnect', () => {
    //     console.log('Disconnected from server!');
    // });

    addListener(socket)

// // Emite un evento personalizado al servidor de API Nest
//     socket.emit('mensaje', 'Hola, servidor!');
//
// // Maneja la respuesta del servidor
//     socket.on('respuesta', (data) => {
//         console.log('Respuesta recibida:', data);
//     });
}


const addListener = () => {
    const serverStatusLabel = document.querySelector('#server-status')
    const clientsUl = document.querySelector('#clients-ul')

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')
    const roomInput = document.querySelector<HTMLInputElement>('#room-input')
    const messagesUl = document.querySelector<HTMLInputElement>('#messages-ul')
    const join = document.querySelector<HTMLInputElement>('#join')

    join.addEventListener('click', (event) => {
        console.log('JOIN')
        if (roomInput.value.trim().length <= 0) return
        socket.emit('createRoom',
            {
                offer: roomInput.value.trim()
            });
    });

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected'
    })
    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnect'
    })

    socket.on('clients-updated', (clients: string[]) => {
        console.log(clients)
        let clientHtml = ''
        clients.forEach(clientId => {
            clientHtml += `
           <li>${clientId}</li>`
        })
        clientsUl.innerHTML = clientHtml
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault()
        debugger
        if (messageInput.value.trim().length <= 0 && roomInput.value.trim().length <= 0) return


        // socket.emit('message', {offer: '6564c009e900910a62246311', message: 'Hola mundo'});
        socket.emit('message',
            {
                id: 'yo', text: messageInput.value.trim(), offer: roomInput.value.trim()
            });
        messageInput.value = ""
        // roomInput.value = ""
    });

    socket.on('notification', (data)=>{
        console.log(data)
    })


// Escuchar mensajes desde el servidor en esa sala específica
//     socket.on('message', (payload) => {
//         console.log('pepeeeeeeeeeeeeeeeeeeeeeeeeee')
//         console.log('Mensaje recibido desde la sala:', data);
//         // Aquí puedes manejar el mensaje como desees en tu aplicación front-end
//     });

    socket.on('message', (payload: { fullName: string, message: string, room: string }) => {
        debugger;
        const newMessage = `
     <li>
     <strong>${payload.fullName}</strong>
     <strong>${payload.message}</strong>
     <strong>${payload.room}</strong>
    </li>
     `
        const li = document.createElement('li')
        li.innerHTML = newMessage
        messagesUl.appendChild(li)
    })
}