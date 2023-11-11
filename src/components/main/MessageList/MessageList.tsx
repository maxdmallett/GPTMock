import './MessageList.css'
import Message from './Message'
import { ThreadMessage } from 'openai/resources/beta/threads/messages/messages.mjs';

interface IProps {
    messages: ThreadMessage[];
}

const MessageList = (props: IProps) => {

    const { messages } = props;

    if (!messages) return null;

    return (
        <section className='message-list'>
            {
                messages.map((message) => {
                    return (
                        <Message
                            key={message.id}
                            id={message.id}
                            content={message.content}
                        />
                    )
                })
            }
        </section>
    )
}

export default MessageList