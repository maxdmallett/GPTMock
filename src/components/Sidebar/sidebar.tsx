import { ThreadMessage } from 'openai/resources/beta/threads/messages/messages.mjs';
import './Sidebar.css'

interface IProps {
    messages: ThreadMessage[];
}

const Sidebar = (props: IProps) => {
    const { messages } = props;
    return (
        <section className="sidebar">
            {
                // Currently can only handle one thread at a time
                messages.length > 0 && (
                    <>
                        <h3>Threads</h3>
                        <div className='thread-item'>
                            {
                                messages[0].content[0].type === 'text' && (
                                    <p>{messages[0].content[0].text.value}</p>
                                ) 
                            }
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default Sidebar