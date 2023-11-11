import { useState } from 'react';
import './MessageInput.css';

const MessageInput = () => {

    const [sendEnabled, setSendEnabled] = useState<boolean>(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const textAreaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
        setSendEnabled(event.target.value.length > 0);
    }

    const sendButtonClickHandler = () => {
        setTextAreaValue('');
        setSendEnabled(false);
    }

    return (
        <div className='message-input'>
            <div className='input-container'>
                <textarea
                    placeholder='Send a message'
                    onChange={textAreaChangeHandler}
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