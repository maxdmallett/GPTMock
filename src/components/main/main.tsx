import './main.css'
import HeaderBar from './HeaderBar/HeaderBar'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'

const Main = () => {
    return (
        <main>
            <HeaderBar />
            <MessageList />
            <MessageInput />
        </main>
    )
}

export default Main