import './main.css'
import HeaderBar from './HeaderBar/HeaderBar'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import { useState } from 'react'

const Main = () => {

    //const [thread, setThread] = useState<string | null>(null);

    const sendMessage = (message: string) => {
        console.log(message);
    }

    return (
        <main>
            <HeaderBar />
            <MessageList />
            <MessageInput
                sendMessage={sendMessage}
            />
        </main>
    )
}

export default Main