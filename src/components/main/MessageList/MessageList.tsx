import Message from './Message'
import { ThreadMessage } from 'openai/resources/beta/threads/messages/messages.mjs';
import WaitingForMessage from './WaitingForMessage';
import './MessageList.css'
import { scrollToBottom } from '../../../helpers/helpers';
import { useEffect } from 'react';

interface IProps {
    messages: ThreadMessage[];
    waitingForResponse: boolean;
}

const MessageList = (props: IProps) => {

    const { messages, waitingForResponse } = props;

    useEffect(() => {
        scrollToBottom();
    }, [messages, waitingForResponse]);

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
            {
                waitingForResponse && (
                    <WaitingForMessage />
                )
            }
        </section>
    )
}

export default MessageList