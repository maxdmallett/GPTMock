import { useState } from 'react';
import './MessageInput.css';

interface IProps {
    sendMessage: (message: string) => void;
    waitingForResponse: boolean;
}

const MessageInput = (props: IProps) => {

    const { sendMessage, waitingForResponse } = props;

    const [sendEnabled, setSendEnabled] = useState<boolean>(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const textAreaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
        setSendEnabled(event.target.value.length > 0);
    }

    const sendButtonClickHandler = () => {
        clearInputAndSendMessage();
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            clearInputAndSendMessage();
        }
    }

    const clearInputAndSendMessage = () => {
        if (textAreaValue.length < 1 || waitingForResponse) return;
        setTextAreaValue('');
        setSendEnabled(false);
        sendMessage(textAreaValue);
    }

    return (
        <div className='message-input'>
            <div className='input-container'>
                <textarea
                    placeholder='Send a message'
                    onChange={textAreaChangeHandler}
                    onKeyDown={keyDownHandler}
                    value={textAreaValue}
                >
                </textarea>
                <button 
                    className='btn-cta' 
                    disabled={!sendEnabled}
                    onClick={sendButtonClickHandler}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default MessageInput