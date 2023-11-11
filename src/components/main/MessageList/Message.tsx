import { MessageContentImageFile, MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs";

interface IProps {
    id: string;
    content: (MessageContentImageFile | MessageContentText)[];
}

const Message = (props: IProps) => {
    const { id } = props;
    return (
        <article className="message">
            <div className="container">
                <div className="avatar"></div>
                <div className="content">
                    {
                        props.content.map((content, index) => {
                            if (content.type === 'text') {
                                return (
                                    <p key={id + String(index) + 'text'}>{content.text.value}</p>
                                )
                            } else {
                                return (
                                    <img key={id + String(index) + 'image'} src={content.image_file.file_id} alt={content.image_file.file_id} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </article>
    )
}

export default Message