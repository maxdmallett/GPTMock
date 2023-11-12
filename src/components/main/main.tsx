import HeaderBar from './HeaderBar/HeaderBar'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import { useState } from 'react'
import { Thread } from 'openai/resources/beta/threads/threads.mjs'
import { createThread, runThreadAndWaitForResponse, sendMessageToThread } from '../../api/mock-api'
import { ThreadMessage } from 'openai/resources/beta/threads/messages/messages.mjs'
import './main.css'



const Main = () => {

    const [thread, setThread] = useState<Thread | null>(null);
    const [messages, setMessages] = useState<ThreadMessage[]>([]);
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);

    const sendMessage = async (message: string) => {
        if (thread) {
            addMessage(message, thread);
        } else {
            createThread().then((thread) => {
                setThread(thread);
                addMessage(message, thread);
            });
        }
    }

    const addMessage = (message: string, thread: Thread) => {
        sendMessageToThread(message, thread).then((response) => {
            setMessages(previousMessages => [...previousMessages, response]);
            setWaitingForResponse(true);
            runThreadAndWaitForResponse(thread).then((response) => {
                setWaitingForResponse(false);
                setMessages(() => [...response]);
                console.log('**messages**');
                console.log(messages);
            });
        });
    }

    return (
        <main>
            <HeaderBar />
            <MessageList
                messages={messages}
                waitingForResponse={waitingForResponse}
            />
            <MessageInput
                sendMessage={sendMessage}
            />
        </main>
    )
}

export default Main