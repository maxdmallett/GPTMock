import HeaderBar from './HeaderBar/HeaderBar'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import MessageInstructions from './MessageList/MessageInstructions/MessageInstructions'
import { ThreadMessage } from 'openai/resources/beta/threads/messages/messages.mjs'
import './main.css'

interface IProps {
    sendMessage: (message: string) => void;
    messages: ThreadMessage[];
    waitingForResponse: boolean;
}

const Main = (props: IProps) => {
    const { sendMessage, messages, waitingForResponse } = props;

    return (
        <main>
            <HeaderBar />
            {
                messages.length > 0 ? (
                    <MessageList
                        messages={messages}
                        waitingForResponse={waitingForResponse}
                    />
                ) : (
                    <MessageInstructions />
                )
            }
            
            <MessageInput
                sendMessage={sendMessage}
            />
        </main>
    )
}

export default Main